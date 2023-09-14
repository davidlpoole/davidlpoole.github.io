blog('blog', './data.json')

const sortBy = 'section' // 'section' | 'sprint'

async function blog(blogElementId, blogDataJSON) {
  const response = await fetch(blogDataJSON)
  const blogData = await response.json()
  console.log(blogData)

  // find the blog div + create a list from each type of blog
  const blogElement = document.getElementById(blogElementId)
  blogData.forEach((post) => {
    const sectionDiv =
      sortBy === 'section'
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
  const listItem = sectionDiv.appendChild(document.createElement('li'))
  listItem.setAttribute('id', post.id)

  // add the hyperlink to each list item
  const link = listItem.appendChild(document.createElement('a'))
  link.setAttribute('href', post.url)
  link.innerHTML = post.title
}
