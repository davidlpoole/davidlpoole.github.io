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
  const element = document.getElementById('lists')
  data.forEach((section) => blogSection(element, section))
}

function blogSection(element, section) {
  const div = element.appendChild(document.createElement('div'))
  const heading = div.appendChild(document.createElement('div'))
  heading.innerHTML = section.heading
  heading.classList.add('t-2', 'pb-1')
  const ul = div.appendChild(document.createElement('ul'))
  blogItems(ul, section.posts)
}

function blogItems(ul, urls) {
  urls.forEach((url) => {
    ul.innerHTML += `<li id=${url.id}><a href=${url.url}>${url.title}</a></li>`
  })
}

blog()
