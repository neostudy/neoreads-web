import { EVENT_BUS } from "src/eventbus.js"
var mdi = require("markdown-it")({
  html: true
});

class ContentManager {
  $store;
  $axios;
  contents = {};
  content = '';
  title = '';
  element = null;
  initialized = false;
  last = {};

  constructor(store, axios) {
    this.$store = store;
    this.$axios = axios;
  }

  // initialize NoteManager
  init(store, axios) {
    if (!this.initialized) {
      this.$store = store;
      this.$axios = axios;
      this.initialized = true;
    }
  }

  fetchChapter(bookid, chapid) {
    let self = this;
    if (bookid == this.last.bookid && chapid == this.last.chapid) { // already fetched
      console.log("content already loaded")
      return new Promise((resolve, reject) =>{
        resolve(self.content);
      })
    }
    console.log("fetching content for [", bookid, ":", chapid, "]");
    if (bookid && bookid != "" && chapid && chapid != "") {
      let self = this;
      let contentUrl =
        "/api/v1/book/" + bookid + "/chapter/" + chapid;
      return this.$axios.get(contentUrl).then(res => {
        let data = res.data;
        self.content = data.content;
        self.title = data.title;
        self.parseContent();
        self.last = {
          bookid: bookid,
          chapid: chapid
        };
        return self.contents;
      });
    } else {
      throw "error";
    }
  }

  parseContent() {
    let c = this.content;
    let el = document.getElementById("chapter-content")
    if (!el) return;
    //el.hidden = true;
    el.innerHTML = mdi.render(this.content);
    this.element = el;
    console.log("el:", el)
    console.log("text:", this.getSentText("DWYz"))
  }

  getSentText(sentid) {
    let sent = document.getElementById(sentid);
    if (!sent) return '';
    return sent.previousSibling.textContent;
  }

  getNotedSents(notes) {
    let sents = []
    for (let sent of this.element.getElementsByTagName("sent")) {
      let sentText = sent.previousSibling.textContent;
      let sentid = sent.id;
      if (sentid in notes) {
        let nts = notes[sentid] // array of notes
        let sent = {
          id: sentid,
          text: sentText,
          note: {}
        };
        for (let n of nts) {
          if (n.ntype == 0) {  // mark
            sent.fav = { id: n.id };
          } else if (n.ntype == 1) { // note
            sent.note = n
          }
        }
        sents.push(sent)
      }
    }
    return sents;
  }

  // utils
  authGet(url) {
    return this.$axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.$store.getters.token}`
      }
    });
  }

  authPost(url, json) {
    return this.$axios.post(url, json, {
      headers: {
        Authorization: `Bearer ${this.$store.getters.token}`
      }
    });
  }
}

export const CONTENTS = new ContentManager();
