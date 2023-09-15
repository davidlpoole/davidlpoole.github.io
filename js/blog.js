const groupByForm = document.forms.groupAndFilter
let groupByValue = groupByForm.elements.groupBy.value

const groupByFieldset = document.getElementById('groupBy')

groupByFieldset.addEventListener('input', initializeBlog)

const filterByInput = document.getElementById('filterBy')
filterByInput.addEventListener('input', initializeBlog)
let filterBy = filterByInput.value

function initializeBlog() {
  filterBy = filterByInput.value
  groupByValue = groupByForm.elements.groupBy.value
  const blogElement = document.getElementById('blog')
  if (blogElement.children.length > 0) blogElement.replaceChildren()
  blog('blog', './data.json')
}

initializeBlog()

function filterBlogs(blogData, filterText) {
  const filteredData = blogData.filter((post) => {
    return (
      post.title.toUpperCase().includes(filterText.toUpperCase()) ||
      post.section.toUpperCase().includes(filterText.toUpperCase()) ||
      post.sprint === parseInt(filterText)
    )
  })

  if (filteredData.length > 0) {
    return filteredData
  } else {
    return [
      {
        id: 0,
        url: '',
        title: `Sorry, no blog articles found with for the search '${filterText}'.`,
        section: '',
        sprint: 0,
      },
    ]
  }
}

async function blog(blogElementId, blogDataJSON) {
  const response = await fetch(blogDataJSON)
  const fullBlogData = await response.json()
  // console.table(blogData)

  const blogData =
    filterBy.length > 0 ? filterBlogs(fullBlogData, filterBy) : fullBlogData

  // find the blog div + create a list from each type of blog
  const blogElement = document.getElementById(blogElementId)
  blogData.forEach((post) => {
    const sectionDiv =
      groupByValue === 'section'
        ? getSectionDiv(blogElement, post.section)
        : getSectionDiv(blogElement, `Sprint ${post.sprint}`)
    addBlogItem(sectionDiv, post)
  })
}

function getSectionDiv(blogElement, section) {
  // find element or return null
  let sectionList = document.getElementById(`ul${section}`)

  // if null then create them
  if (!sectionList) {
    sectionContainer = blogElement.appendChild(document.createElement('div'))
    sectionContainer.classList.add('section')

    headingDiv = sectionContainer.appendChild(document.createElement('div'))
    headingDiv.innerHTML = section
    headingDiv.classList.add('t-2', 'pb-1')

    sectionList = sectionContainer.appendChild(document.createElement('ul'))
    sectionList.setAttribute('id', `ul${section}`)
  }
  return sectionList
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
