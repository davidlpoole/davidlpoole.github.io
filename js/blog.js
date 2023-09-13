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

function blog() {
  // find the blog div + create a list from each type of blog
  const blog = document.getElementById('blog')
  data.forEach((section) => blogSection(blog, section))
}

function blogSection(blog, section) {
  // section container div + heading + styles
  const div = blog.appendChild(document.createElement('div'))
  const heading = div.appendChild(document.createElement('div'))
  heading.innerHTML = section.heading
  heading.classList.add('t-2', 'pb-1')

  // Start an unordered list
  const ul = div.appendChild(document.createElement('ul'))

  // Add each blog link as a list item
  section.posts.forEach((post) => {
    ul.innerHTML += `<li id=${post.id}><a href=${post.url}>${post.title}</a></li>`
  })
}

blog()
