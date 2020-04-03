import { EVENT_BUS } from "src/eventbus.js"
var _cnt = 0
class NoteManager {
  $store;
  $axios;
  id;
  notes = {};

  constructor(store, axios) {
    this.$store = store;
    this.$axios = axios;
  }

  // initialize NoteManager
  init(store, axios, bookid, chapid) {
    this.$store = store;
    this.$axios = axios;
    this.id = ++_cnt;
    this.$store.dispatch("setChapid", {
      bookid: bookid,
      chapid: chapid
    });
    console.log("CTX INITE:", this.ctx)
  }

  relocate(bookid, chapid) {
    this.$store.dispatch("setChapid", {
      bookid: bookid,
      chapid: chapid
    });
  }

  fetchNotes() {
    let self = this;
    let query = "bookid=" + this.ctx.pos.bookid + "&chapid=" + this.ctx.pos.chapid;
    return this.authGet("/api/v1/note/list/mine/?" + query).then(res => {
      for (let n of res.data) {
        self.notes[n.id] = n;
      }
      return self.notes
    });
  }

  get allNotes() {
    return this.notes;
  }

  get ctx() {
    return this.$store.getters.select;
  }

  getNote(noteid) {
    return this.notes[noteid];
  }

  addFav() {
    var pos = this.ctx.pos;
    var json = {
      ntype: 0, // mark
      ptype: 1, // position: sent
      bookid: pos.bookid,
      chapid: pos.chapid,
      paraid: pos.paraid,
      sentid: pos.sentid,
      wordid: ""
    };
    let self = this;

    return this.authPost("/api/v1/note/add", json).then(res => {
      let noteid = res.data.id;
      let note = json;
      note.id = noteid;
      self.notes[noteid] = note;
      EVENT_BUS.$emit("NOTE_ADDED", note)
      this.$store.dispatch("addFav")
      return note;
    }).catch(error => {
      console.log(error);
      throw error;
    });
  }

  removeFav() {
    let favid = this.ctx.favid;
    let note = this.notes[favid];
    if (!note) return;
    console.log("removing fav:", favid);
    let self = this;
    this.authGet("/api/v1/note/remove/" + favid).then(res => {
      self.$store.dispatch("removeFav")
      delete self.notes[favid]
    });
  }

  saveNote(content) {
    let ctx = this.ctx;
    console.log("ctx:", ctx)
    if (!('note' in ctx) || !ctx.note) {
      ctx.note = {};
    }
    console.log("ctx:", ctx)
    let note = ctx.note;
    console.log("note:", note)
    var url = '';
    if ('id' in note) { // modify
      note.content = content;
      url = "/api/v1/note/modify";
    } else { // create 
      note = {
        ntype: 1, // note
        ptype: 1, // position: sentence
        bookid: ctx.pos.bookid,
        chapid: ctx.pos.chapid,
        paraid: ctx.pos.paraid,
        sentid: ctx.pos.sentid,
        content: content,
      };
      url = "/api/v1/note/add";
    }

    console.log("save note:", note);
    let self = this;
    return this.authPost(url, note).then(res => {
      let noteid = res.data.id;
      note.id = noteid;
      self.notes[noteid] = note;
      EVENT_BUS.$emit("NOTE_ADDED", note);
      this.$store.dispatch("addNote", note);
      return note;
    }).catch(error => {
      console.log(error);
      throw error;
    });
  }

  removeNote(noteid) {
    let self = this;
    this.authGet("/api/v1/note/remove/" + noteid).then(res => {
      let note = self.notes[noteid];
      EVENT_BUS.$emit("NOTE_REMOVED", note);
      self.$store.dispatch("removeNote")
      delete self.notes[noteid];
    });
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

export const NOTES = new NoteManager();
