import { NOTES } from "src/js/note/note.js"
import { EVENT_BUS } from "src/eventbus.js"

export default {
  created() {
    EVENT_BUS.$on("NOTE_ADDED", this.applyNote)
    EVENT_BUS.$on("NOTE_REMOVED", this.clearNote)
  },
  methods: {
    addFav() {
      NOTES.addFav();
    },
    removeFav() {
      NOTES.removeFav()
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
        if (!span.noteids) {
          span.noteids = n.id;
        } else {
          span.noteids = span.noteids + "," + n.id;
        }
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
    clearNote(n) {
      let sent = document.getElementById(n.sentid);
      if (sent) {
        let span = sent.previousSibling;
        if (n.ntype == 0) {
          //mark
          span.classList.remove("mark");
        } else if (n.ntype == 1) {
          // note
          span.classList.remove("note");
          span.title = "";
        } else {
          span.classList.remove("other-note");
        }
      }

    }
  }
}