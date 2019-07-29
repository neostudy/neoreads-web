import { EVENT_BUS } from "src/eventbus.js"
var _cnt = 0
class NoteManager {
  $store;
  $axios;
  /*
  ctx = {
    pos: {
      bookid: '',
      chapid: '',
      paraid: '',
      sentid: '',
      start: 0,
      end: 0
    }

  };
  */
  id;
  notes = {};

  constructor(store, axios) {
    this.$store = store;
    this.$axios = axios;
  }

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

  fetchNotes() {
    let self = this;
    let query = "bookid=" + this.ctx.pos.bookid + "&chapid=" + this.ctx.pos.chapid;
    return this.authGet("/api/v1/note/list?" + query).then(res => {
      console.log("fetched notes:", res);
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

  removeFav(noteid) {
    let note = this.notes[noteid];
    if (!note) return;
    console.log("removing note:", noteid);
    let self = this;
    this.authGet("/api/v1/note/remove/" + noteid).then(res=>{
      self.$store.dispatch("removeFav")
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
