<template>
  <div>
    <div v-bar>
      <div class="poem-content-pane">
        <div class="poem-content-inner normal">
          <phonetics-para
            v-for="(p,i) in paras"
            :key="i"
            :html="p"
            @select="$emit('select', $event)"
            :highlight="highlight"
          ></phonetics-para>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PhoneticsPara from "./PhoneticsPara.vue";
import mdi from "src/js/markdown/render.js";
import "highlight.js/styles/github.css";
export default {
  props: ["content"],
  components: {
    PhoneticsPara
  },
  data() {
    return {
      paras: [],
      highlight: ""
    };
  },
  watch: {
    content() {
      console.log("content updated!");
      this.parseContent();
    }
  },
  created() {
    if (this.content !== "") {
      this.parseContent();
    }
  },
  methods: {
    // TODO: how to avoid contaminating <pre><code> blocks
    parseContent() {
      let md = mdi.render(this.content);

      let dp = new DOMParser();
      let dom = dp.parseFromString(md, "text/html");

      let tags = dom.body.children;
      let paras = [];
      for (let i = 0; i < tags.length; ++i) {
        paras.push(tags[i].outerHTML);
      }

      let mdps = paras.map(ln => ln.trim());
      this.paras = mdps;
    },
  }
};
</script>

<style lang="stylus" scoped>
.poem-content-pane
  max-height 860px

  .poem-content-inner
    padding 20px 20px 20px 0
</style>

<style lang="stylus">
.poem-content-inner
  & .sent
    display inline-block
    margin-bottom 0.6em
    padding 5px

    &.selected
      background-color #C6E2FF
      border-radius 5px

    & span.selected
      background-color #C6E2FF

    & .note
      // background-color #C6E2FF
      border-bottom 5px inset #C6E2FF

      &.deep
        // background-color #A6C2CF
        border-bottom 5px inset #A6C2CF

  &.large .sent
    font-size 2em

  &.normal .sent
    font-size 1.3em

  & .sent-stat
    display none
    border 1px solid #ddd
    border-radius 4px
    font-size 0.8em
    color #666
    background-color #fafafa
    padding 2px 6px
    margin-left 10px
</style>

<style lang="stylus" src="src/stylus/markdown.styl"></style>
