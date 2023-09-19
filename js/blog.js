const blogElement = document.getElementById('blog')
const groupByFieldset = document.getElementById('groupBy')
const filterByInput = document.getElementById('filterBy')

groupByFieldset.addEventListener('input', initializeBlog)
filterByInput.addEventListener('input', initializeBlog)

const groupByForm = document.forms.groupAndFilter
let groupByValue = groupByForm.elements.groupBy.value
let filterBy = filterByInput.value

const ERROR_MESSAGES = {
  network: 'Network error while fetching blog content.',
  blogContent: 'Error displaying blog content.',
  noContent: 'No posts found.',
}

function initializeBlog() {
  filterBy = filterByInput.value
  groupByValue = groupByForm.elements.groupBy.value
  blogElement.replaceChildren()
  displayBlog('./data.json')
}

initializeBlog()

async function fetchBlogData(blogDataJSON) {
  try {
    const response = await fetch(blogDataJSON)
    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
    return await response.json()
  } catch (error) {
    handleError(ERROR_MESSAGES.network, error)
  }
}

function displayErrorText(errorText, element) {
  element.innerHTML = errorText
  element.classList.add('error-text')
}

function handleError(message, error) {
  console.error(`${message} ${error.message}`)
  displayErrorText(message, blogElement)
}

async function displayBlog(blogDataJSON) {
  const blogData = await fetchBlogData(blogDataJSON)

  const filteredBlogData =
    filterBy.length > 0 ? filterBlogData(blogData, filterBy) : blogData

  if (filteredBlogData.length === 0)
    displayErrorText(ERROR_MESSAGES.noContent, blogElement)

  // find the blog div + create a list from each type of blog
  filteredBlogData.forEach((post) => {
    const sectionDiv = getOrCreateSectionDiv(post[groupByValue])
    addBlogItem(sectionDiv, post)
  })
}

function filterBlogData(blogData, filterText) {
  return blogData.filter((post) => {
    return (
      post.title.toUpperCase().includes(filterText.toUpperCase()) ||
      post.section.toUpperCase().includes(filterText.toUpperCase()) ||
      post.sprint.toUpperCase().includes(filterText.toUpperCase())
    )
  })
}

function getOrCreateSectionDiv(section) {
  // find element or return null
  let sectionDiv = document.getElementById(`ul${section}`)

  // if null then create
  if (!sectionDiv) {
    const sectionContainer = createSectionContainer(section)
    sectionDiv = createSectionList(sectionContainer, section)
  }
  return sectionDiv
}

function createSectionList(sectionContainer, section) {
  const sectionList = sectionContainer.appendChild(document.createElement('ul'))
  sectionList.setAttribute('id', `ul${section}`)
  return sectionList
}

function createSectionContainer(section) {
  const sectionContainer = blogElement.appendChild(
    document.createElement('div')
  )
  sectionContainer.classList.add('section')

  const headingDiv = sectionContainer.appendChild(document.createElement('div'))
  headingDiv.innerHTML = section
  headingDiv.classList.add('t-2', 'pb-1')

  return sectionContainer
}

function addBlogItem(sectionDiv, post) {
  // Add each blog link as a list item
  if (post.url.length > 0) {
    const listItem = sectionDiv.appendChild(document.createElement('li'))
    listItem.setAttribute('id', post.id)

    // add the hyperlink to each list item
    const link = listItem.appendChild(document.createElement('a'))
    link.setAttribute('href', post.url)
    link.innerHTML = post.title
  } else {
    sectionDiv.innerHTML = post.title
    sectionDiv.classList.add('error-text')
  }
}
