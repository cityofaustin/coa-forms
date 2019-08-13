const cheerio = require("cheerio");
const fs = require("fs");

// Patches hotjar and google analytics code for production only
const transformHtml = (content) => {
  if (process.env.NODE_ENV === "production") {
    const hotjar = `<!-- Hotjar Tracking Code for https://opo-form.netlify.com/ or change url in their dashboard --> <script>(function(h, o, t, j, a, r){h.hj=h.hj || function(){(h.hj.q=h.hj.q || []).push(arguments);}; h._hjSettings={hjid: 1188991, hjsv: 6}; a=o.getElementsByTagName('head')[0]; r=o.createElement('script'); r.async=1; r.src=t + h._hjSettings.hjid + j + h._hjSettings.hjsv; a.appendChild(r);})(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv='); </script>`
    const gaTag = `
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-27761834-11"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-27761834-11');
      </script>
    `;

    const index = cheerio.load(content.toString())
    index("head").append(gaTag)
    index("head").append(hotjar)

    return index.html()
  } else {
    return content
  }
}

module.exports = {
  transformHtml
}
