<template>
  <div class="tag-wrap" :class="kindClass" @click="clicked">
    <nsicon :i="itype" :value="tag.tag"></nsicon>
  </div>
</template>

<script>
import Nsicon from "../tools/NeoStatIcon.vue";
let kindMap = {
  0: "topic", // topic
  1: "event", // event
  2: "people", // people
  3: "place", // place
  4: "time" // time
};
let kindIconMap = {
  0: "comment", // topic
  1: "hashtag", // event
  2: "user", // people
  3: "globe-asia", // place
  4: "moon" // time
};
export default {
  components: {
    Nsicon
  },
  props: ["tag"],
  computed: {
    itype() {
      let kind = kindIconMap[this.tag.kind];
      if (!kind) {
        return "comments";
      } else {
        return kind;
      }
    },
    kindClass() {
      return kindMap[this.tag.kind];
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

.tag-wrap.event
  color #FD8042
  background-color #FDE4D8
  border 1px solid #FD8042

.tag-wrap.place
  color teal
  background-color #def2f0
  border 1px solid teal

.tag-wrap.people
  color #A076E5
  background-color #DEDAE5
  border 1px solid #A076E5

.tag-wrap.time
  color yellow
  background-color #E2F0FF
  border 1px solid #409EFF
</style>