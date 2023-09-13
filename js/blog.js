blog('blog', './data.json')

async function blog(blogElementId, blogDataJSON) {
  const response = await fetch(blogDataJSON)
  const blogData = await response.json()

  // find the blog div + create a list from each type of blog
  const blogElement = document.getElementById(blogElementId)
  blogData.forEach((sectionData) => blogSection(blogElement, sectionData))
}

function blogSection(blogElement, sectionData) {
  // section container div + heading + styles
  const sectionContainer = blogElement.appendChild(
    document.createElement('div')
  )
  const headingDiv = sectionContainer.appendChild(document.createElement('div'))
  headingDiv.innerHTML = sectionData.heading
  headingDiv.classList.add('t-2', 'pb-1')

  // Start an unordered list
  const sectionList = sectionContainer.appendChild(document.createElement('ul'))

  // Add each blog link as a list item
  sectionData.posts.forEach((post) => {
    blogListItem(sectionList, post)
  })
}

function blogListItem(sectionList, post) {
  // create a list item for each blog post
  const listItem = sectionList.appendChild(document.createElement('li'))
  listItem.setAttribute('id', post.id)

  // add the hyperlink to each list item
  const link = listItem.appendChild(document.createElement('a'))
  link.setAttribute('href', 'post.url')
  link.innerHTML = post.title
}
