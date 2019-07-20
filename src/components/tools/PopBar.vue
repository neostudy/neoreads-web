<template>
  <div v-show="isShow" class="pop-bar" id="pop-bar">
    <span>
      <faicon v-if="isFavorite" icon="heart" size="lg" @click="fav" class="mark"></faicon>
      <faicon v-if="!isFavorite" :icon="['far', 'heart']" size="lg" @click="fav"></faicon>
      <label>128</label>
    </span>
    <span>
      <faicon @click="openNotes" icon="pen-square" size="lg"></faicon>
      <label>12</label>
    </span>
    <span>
      <faicon @click="openComments" icon="comments" size="lg"></faicon>
      <label>99</label>
    </span>
    <span>
      <faicon @click="openQuotes" icon="quote-left" size="lg"></faicon>
      <label>58</label>
    </span>
  </div>
</template>

<script>
import { EVENT_BUS } from "src/eventbus.js";
export default {
  props: ["id"],
  data() {
    return {
      isShow: false,
      isFavorite: false,
      note: {}
    };
  },
  mounted() {
    // listen to open event
    EVENT_BUS.$on("OPEN_POPBAR", this.show);

    // close popper when clicked outside
    this.closeOnClickOutside();
  },
  methods: {
    show() {
      this.reposition();
      this.isShow = true;
    },
    closeOnClickOutside() {
      let self = this;
      document.onmouseup = function(e) {
        var pop = document.getElementById("pop-bar");
        if (pop && pop != e.target && !pop.contains(e.target)) {
          self.show = false;
        }
      };
    },
    fav() {
      if (this.isFavorite) {
        this.isFavorite = false;
      } else {
        this.isFavorite = true;
      }
      this.$emit("fav", this.isFavorite);
    },
    openNotes() {
      this.$message("NOTE");
      EVENT_BUS.$emit("OPEN_NOTES");
    },
    openComments() {
      this.$message("Comments");
    },
    openQuotes() {
      this.$message("Quotes");
    },
    reposition() {
      let ctx = this.$store.getters.select;
      this.isFavorite = ctx.isFav;
      this.note = ctx.note;
      let rec = ctx.rect;
      let lineHeight = 32;
      let mouseOffset = ((ctx.mouse.clientY - rec.top) / lineHeight) | 0;
      //let left = (rec.left + rec.right) / 2 - this.$el.clientWidth / 2;
      // the HEART icon should be direct above the mouse
      let left = ctx.mouse.clientX - 24;
      let popHeight = 48; // clientHeight: 42, plus shadows
      let top = rec.top + mouseOffset * lineHeight - popHeight;
      this.$el.style.top = top + "px";
      this.$el.style.left = left + "px";
      this.$el.style.display = "block";
    }
  }
};
</script>

<style lang="stylus">
div.pop-bar
  text-align left
  padding 5px
  position fixed
  top 100px
  left 200px
  width 250px
  height 32px
  line-height 32px
  border 1px solid #A0CFFF
  background-color #E2F0FF
  border-radius 4px
  box-shadow 0px 2px 6px #A0CFFF
  transition display 300ms ease-in

  span
    margin-left 5px
    margin-right 10px

    svg
      color #409EFF
      cursor pointer

    svg.mark
      color #FF6666

    label
      margin-left 5px
      font-size 16px
      color #3077BF
</style>
