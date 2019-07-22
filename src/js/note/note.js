var _cnt = 0
class NoteManager {
  $store;
  $axios;
  ctx;
  id;
  notes = {};

  constructor(store, axios) {
    this.$store = store;
    this.$axios = axios;
  }

  init(store, axios) {
    this.$store = store;
    this.$axios = axios;
    this.id = ++_cnt;
    this.updateCtx();
  }

  updateCtx() {
    this.ctx = this.$store.getters.select;
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

  getNote(noteid) {
    return this.notes[noteid];
  }

  addFav() {
    var pos = this.ctx.pos;
    console.log(pos)
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
      let note = res.data;
      self.notes[note.id] = note;
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
    this.authGet("/api/v1/note/remove/" + noteid);
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
