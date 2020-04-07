<template>
  <div class="note-card">
    <div class="note-card-title">
      <div class="note-card-tags">
      </div>
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

    .right
      float right
      color #409EFF

    svg
      cursor pointer
      margin-left 5px

  .note-card-content
    padding 10px
</style>