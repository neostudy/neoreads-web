export default {
  data: function() {
    return {
      hello: "hello from mixin!",
      pages: [],
      curPage: 0,
      endChapter: false
    }
  },
  methods: {
    renderPage(paras) {
      let container = document.getElementById("reader-content-panel");
      while (container.lastChild) {
        container.lastChild.remove();
      }
      let page = this.curPage;
      var lastIdx = 0;
      if (page >= this.pages.length) {
        // a new page
        if (this.pages.length == 0) {
          lastIdx = 0;
        } else {
          lastIdx = this.pages[this.pages.length - 1][1];
        }
      } else {
        lastIdx = this.pages[page][0];
      }
      let start = lastIdx;
      var i = 0;
      for (i = lastIdx; i < paras.length; i++) {
        let d = document.createElement("div");
        d.innerHTML = paras[i];
        container.appendChild(d);
        // check current height
        let height = container.clientHeight;
        console.log(height);
        if (height > 700) {
          break;
        }
      }
      if (i >= paras.length) {
        this.endChapter = true;
      }
      let end = i;
      if (page >= this.pages.length) {
        this.pages.push([start, end]);
      }
      console.log(this.pages);
      console.log("curpage:", this.curPage);
    },
    prevPage(paras) {
      this.curPage = this.curPage - 1;
      if (this.curPage < 0) this.curPage = 0;
      else {
        this.endChapter = false;
        this.renderPage(paras);
        this.rebind();
      }
    },
    nextPage(paras) {
      if (!this.endChapter) {
        this.curPage = this.curPage + 1;
        this.renderPage(paras);
        this.rebind();
      }
    }
  }
}