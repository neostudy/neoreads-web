<template>
  <div class="tag-wrap" :class="tag.kind" @click="clicked">
    <nsicon :i="itype" :value="tag.name"></nsicon>
  </div>
</template>

<script>
import Nsicon from "../tools/NeoStatIcon.vue";
let map = {
  topic: "comment",
  what: "hashtag",
  who: "user",
  where: "globe-asia",
  when: "moon"
};
export default {
  components: {
    Nsicon
  },
  props: ["tag"],
  computed: {
    itype() {
      let kind = map[this.tag.kind];
      if (!kind) {
        return "comments";
      } else {
        return kind;
      }
    }
  },
  methods: {
    clicked() {
      this.$emit("click", this.tag);
    }
  }
};
</script>

<style lang="stylus" scoped>
.tag-wrap
  display inline-block
  height 18px
  line-height 18px
  font-size 0.7em
  border-radius 4px
  cursor pointer
  color #409EFF
  background-color #E2F0FF
  border 1px solid #409EFF

.tag-wrap.what
  color #FD8042
  background-color #FDE4D8
  border 1px solid #FD8042

.tag-wrap.where
  color teal
  background-color #def2f0
  border 1px solid teal

.tag-wrap.who
  color #A076E5
  background-color  #DEDAE5
  border 1px solid #A076E5

.tag-wrap.when
  color yellow
  background-color #E2F0FF
  border 1px solid #409EFF


</style>