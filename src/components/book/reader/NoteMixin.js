import {NOTES} from "src/js/note/note.js"

export default {
  methods: {
    addFav(paraid, sentid) {
      let self = this;
      NOTES.addFav().then(note => {
        self.applyNote(note)
      });
    },
    removeFav(sentid) {
      NOTES.removeFav(sentid)
    },
    // fetch notes from server
    // should be called once per chapter
    fetchNotes() {
      let self = this;
      NOTES.fetchNotes().then(notes => {
        self.bindNotes()
      })
    },
    bindNotes() {
      console.log("binding notes");
      let notes = NOTES.allNotes;
      for (var noteid in notes) {
        let note = notes[noteid];
        this.applyNote(note);
      }
    },
    applyNote(n) {
      let sent = document.getElementById(n.sentid);
      if (sent) {
        let span = sent.previousSibling;
        span.sentid = n.sentid;
        span.noteid = n.noteid;
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