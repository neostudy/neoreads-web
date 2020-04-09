<template>
  <div class="note-card">
    <div class="note-card-title">
      <span class="note-type" :class="noteTypeClass">{{noteType}}</span>
      <a :href="'/#/people/view/' + note.pid">{{note.pname}}</a>
      :
      <faicon icon="trash" title="删除" class="right" @click="removeNote"></faicon>
      <faicon icon="pen" title="编辑" class="right" @click="editNote"></faicon>
    </div>
    <div class="note-card-content">{{note.content}}</div>
  </div>
</template>

<script>
export default {
  props: ["note"],
  computed: {
    noteType() {
      if (this.note.ntype == 1) {
        return "笔记";
      } else if (this.note.ntype == 2) {
        return "注音";
      } else if (this.note.ntype == 3) {
        return "引用";
      } else if (this.note.ntype == 4) {
        return "翻译";
      } else {
        return "笔记";
      }
    },
    noteTypeClass() {
      if (this.note.ntype == 1) {
        return "";
      } else if (this.note.ntype == 2) {
        return "phonetics";
      } else if (this.note.ntype == 3) {
        return "reference";
      } else if (this.note.ntype == 4) {
        return "translation";
      } else {
        return "";
      }
    }
  },
  methods: {
    removeNote() {
      this.$confirm("确认删除该笔记？").then(_ => {
        let noteid = this.note.id;
        this.authGet("/api/v1/note/remove/" + noteid)
          .then(res => {
            this.$emit("removed", this.note);
          })
          .catch(_ => {});
      });
    },
    editNote() {}
  }
};
</script>

<style lang="stylus" scoped>
.note-card
  padding 10px 0px
  margin-bottom 20px
  border-bottom 1px dashed #D9ECFF
  border-radius 2px

  .note-card-title
    margin-bottom 5px
    line-height 1.2em
    height 1.2em

    .note-type
      color #666
      background-color testcolor
      border 1px solid #ddd
      border-radius 3px
      font-size 0.6em
      padding 0.2em
      margin-right 5px

      &.reference
        color #A076E5
        background-color #DEDAE5
        border 1px solid #A076E5

      &.translation
        color #FD8042
        background-color #FDE4D8
        border 1px solid #FD8042

    .right
      float right
      color #409EFF

    svg
      cursor pointer
      margin-left 5px

  .note-card-content
    padding 10px
</style>