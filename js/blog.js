blog('blog', './data.json')

async function blog(blogElementId, blogDataJSON) {
  const response = await fetch(blogDataJSON)
  const blogData = await response.json()
  console.log(blogData)

  // find the blog div + create a list from each type of blog
  const blogElement = document.getElementById(blogElementId)
  blogData.forEach((post) => blogSection(blogElement, post))
}

function blogSection(blogElement, post) {
  // section container div + heading + styles
  let sectionContainer = document.getElementById(post.section)
  let sectionList = document.getElementById(`ul${post.section}`)

  if (!sectionContainer) {
    sectionContainer = blogElement.appendChild(document.createElement('div'))
    sectionContainer.setAttribute('id', post.section)

    headingDiv = sectionContainer.appendChild(document.createElement('div'))
    headingDiv.innerHTML = post.section
    headingDiv.classList.add('t-2', 'pb-1')

    sectionList = sectionContainer.appendChild(document.createElement('ul'))
    sectionList.setAttribute('id', `ul${post.section}`)
  }

  // Add each blog link as a list item
  const listItem = sectionList.appendChild(document.createElement('li'))
  listItem.setAttribute('id', post.id)

  // add the hyperlink to each list item
  const link = listItem.appendChild(document.createElement('a'))
  link.setAttribute('href', post.url)
  link.innerHTML = post.title
}
