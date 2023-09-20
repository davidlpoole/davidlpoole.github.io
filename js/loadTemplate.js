function loadTemplate(elementId, url) {
  const element = document.getElementById(elementId)
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      element.innerHTML = xhr.responseText
    }
  }
  xhr.send()
}
