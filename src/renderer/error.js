function getStyles () {
  return `
    body,
    html {
      width: 100%;
      height: 100%;
      background-color: #21232a
    }
    body {
      color: #fff;
      text-shadow: 0 2px 4px rgba(0, 0, 0, .5);
      padding: 0;
      min-height: 100%;
      -webkit-box-shadow: inset 0 0 75pt rgba(0, 0, 0, .8);
      box-shadow: inset 0 0 75pt rgba(0, 0, 0, .8);
      display: table;
      font-family: "Open Sans", Arial, sans-serif
    }
    h1 {
      text-align: center;
      font-family: inherit;
      font-weight: 500;
      line-height: 1.1;
      color: inherit;
      font-size: 36px
    }
    h1 small {
      font-size: 68%;
      font-weight: 400;
      line-height: 1;
      color: #777
    }
    a {
      text-decoration: none;
      color: #fff;
      font-size: inherit;
      border-bottom: dotted 1px #707070
    }
    .lead {
      width: 50%;
      margin: 0 auto;
      color: silver;
      font-size: 14px;
      line-height: 1.4
    }
    .cover {
      display: table-cell;
      vertical-align: middle;
      padding: 0 20px
    }
    footer {
      position: fixed;
      width: 100%;
      height: 40px;
      left: 0;
      bottom: 0;
      color: #a0a0a0;
      font-size: 14px
    }
  `
}

function getHTML (err) {
  return `
    <div class="cover">
      <h1>
        An unexpected error occurred
      </h1>
      <p class="lead">
        ${(err.stack || err).toString().replace(/\n/g, '<br/>&ensp;&ensp;')}
      </p>
    </div>
    <!--<footer>
      <p>Technical Contact: <a href=mailto:x@example.com>x@example.com</a></p>
    </footer>-->
  `
}

export default function renderErrorPage (err) {
  const style = document.createElement('style')
  style.innerHTML = getStyles()
  document.querySelector('head').appendChild(style)
  document.querySelector('body').innerHTML = getHTML(err)
}
