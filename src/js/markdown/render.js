
import sentence from "src/js/markdown/sentence.js";
var hljs = require("highlight.js");
var mdi = require("markdown-it")({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          "</code></pre>"
        );
      } catch (__) { }
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  }
})
  .use(require("markdown-it-sup"))
  .use(require("markdown-it-sub"))
  .use(require("markdown-it-mark"))
  .use(require("markdown-it-ins"))
  .use(require("markdown-it-attrs"))
  .use(sentence);

export default mdi;