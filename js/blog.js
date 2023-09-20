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

async function displayBlog(blogDataJSON) {
  const blogData = await fetchData(blogDataJSON)

  const filteredBlogData =
    filterBy.length > 0 ? filterData(blogData, filterBy) : blogData

  if (filteredBlogData.length === 0)
    displayErrorText(ERROR_MESSAGES.noContent, blogElement)
  else {
    filteredBlogData.forEach((post) => {
      displayBlogItem(post)
    })
  }
}

async function fetchData(blogDataJSON) {
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

function filterData(data, filterText) {
  return data.filter((post) => {
    return (
      post.title.toUpperCase().includes(filterText.toUpperCase()) ||
      post.section.toUpperCase().includes(filterText.toUpperCase()) ||
      post.sprint.toUpperCase().includes(filterText.toUpperCase())
    )
  })
}

function displayBlogItem(post) {
  const sectionDiv = getOrCreateSectionDiv(post[groupByValue])
  const listItem = appendListItem(sectionDiv, post.id)
  const link = appendLink(listItem, post.url, post.title)
}

function appendListItem(parent, id) {
  const listItem = parent.appendChild(document.createElement('li'))
  listItem.setAttribute('id', id)
  return listItem
}

function appendLink(parent, url, innerText) {
  const link = parent.appendChild(document.createElement('a'))
  link.setAttribute('href', url)
  link.innerText = innerText
  return link
}

function getOrCreateSectionDiv(section) {
  // find element or return null
  let sectionDiv = document.getElementById(`ul${section}`)
  return sectionDiv || createSectionDiv(section)
}

function createSectionDiv(section) {
  const sectionContainer = blogElement.appendChild(
    document.createElement('div')
  )
  sectionContainer.classList.add('section')

  const headingDiv = sectionContainer.appendChild(document.createElement('div'))
  headingDiv.innerHTML = section
  headingDiv.classList.add('t-2', 'pb-1')

  const sectionDiv = sectionContainer.appendChild(document.createElement('ul'))
  sectionDiv.setAttribute('id', `ul${section}`)
  return sectionDiv
}

function displayErrorText(errorText) {
  const errorDiv = blogElement.appendChild(document.createElement('div'))
  errorDiv.innerHTML = errorText
  errorDiv.classList.add('error-text')
}

function handleError(message, error) {
  console.error(`${message} ${error.message}`)
  displayErrorText(message, blogElement)
}
