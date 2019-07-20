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
        let note = res.data;
        self.notes[sentid] = note;
        self.applyNote(note);
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
    // fetch notes from server
    // should be called once per chapter
    fetchNotes() {
      let self = this;
      let query = "bookid=" + this.bookid + "&chapid=" + this.chapid;
      this.authGet("/api/v1/note/list?" + query).then(res => {
        console.log("fetched notes:", res);
        for (let n of res.data) {
          self.notes[n.sentid] = n;
        }
        self.bindNotes();
      });
    },
    bindNotes() {
      console.log("binding notes");
      for (var sentid in this.notes) {
        let note = this.notes[sentid];
        this.applyNote(note);
      }
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