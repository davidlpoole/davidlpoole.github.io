function header() {
  const element = document.getElementById('header')
  element.innerHTML = `
  <div class="nav">
  <div>
    <a class="title large" href="/index.html">davidlpoole</a>
    <a class="title small" href="/index.html">dlp</a>
  </div>
  <div>
    <a href="https://github.com/davidlpoole" target="_blank">
      <img
        class="github-logo dark hide-print"
        src="/images/github-mark-white.svg"
        title="View my GitHub Profile"
      />
      <img
        class="github-logo light hide-print"
        src="/images/github-mark-black.svg"
        title="View my GitHub Profile"
      />
    </a>
  </div>
</div>
`
}

header()
