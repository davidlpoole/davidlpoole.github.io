const data = [
  {
    heading: 'Technical',
    posts: [
      {
        id: 0,
        url: '/blog/te-houtaewa-template.html',
        title: 'The Story of Te Houtaewa (template)',
      },
      {
        id: 1,
        url: '/blog/html-css.html',
        title: 'CSS Concepts - Margin, Border and Padding',
      },
      {
        id: 2,
        url: '/blog/javascript-dom.html',
        title: 'JavaScript and the DOM',
      },
    ],
  },
  {
    heading: 'Core',
    posts: [
      {
        id: 0,
        url: '/blog/identity-values.html',
        title: 'Exploration of Identity, Values, and Strengths',
      },
      {
        id: 1,
        url: '/blog/learning-plan.html',
        title: 'Dev Academy Learning Plan',
      },
      {
        id: 2,
        url: '/blog/emotional-intelligence.html',
        title: 'Emotional Intelligence Exploration',
      },
    ],
  },
]

function blog(blogElementId, blogData) {
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

blog('blog', data)
