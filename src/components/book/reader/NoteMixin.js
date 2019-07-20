export default {
  methods: {
    addNote(paraid, sentid) {
      var json = {
        ntype: 0, // mark
        ptype: 1, // position: sent
        bookid: this.bookid,
        chapid: this.chapid,
        paraid: paraid,
        sentid: sentid,
        wordid: "0000"
      };
      console.log("add note:", json);
      let self = this;

      this.authPost("/api/v1/note/add", json).then(res => {
        let noteid = res.data.id;
        self.notes[sentid] = res.data;
      });
    },
    removeNote(paraid, sentid) {
      let note = this.notes[sentid];
      if (!note) return;
      let noteid = note.id;
      if (noteid) {
        console.log("removing note:", noteid);
        this.authGet("/api/v1/note/remove/" + noteid);
      }
    },
    getNotes() {
      let query = "bookid=" + this.bookid + "&chapid=" + this.chapid;
      let self = this;
      let token = this.$store.getters.token;
      this.authGet("/api/v1/note/list?" + query).then(res => {
        console.log(res);
        for (let n of res.data) {
          self.notes[n.sentid] = n;
          self.applyNote(n);
        }
      });
    },
    applyNote(n) {
      let sent = document.getElementById(n.sentid);
      if (sent) {
        let span = sent.previousSibling;
        span.sentid = n.sentid;
        if (n.ntype == 0) {
          //mark
          span.classList.add("mark");
        } else if (n.ntype == 1) {
          // note
          span.classList.add("note");
          span.title = n.content;
        } else {
          span.classList.add("other-note");
        }
      }
    },
  }
}