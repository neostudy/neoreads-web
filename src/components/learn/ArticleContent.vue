<template>
  <div class="article-content-pane">
    <poem-content v-if="mode == ViewMode.Read" :content="content" :large="true"></poem-content>
    <phonetics-content v-if="mode == ViewMode.Phonetics" :content="content"></phonetics-content>
  </div>
</template>

<script>
import PoemContent from "../content/PoemContent.vue";
import PhoneticsContent from "../content/PhoneticsContent.vue";
import {ViewMode} from "../../js/constants.js";

export default {
  props: ["mode", "content"],
  components: {
    PoemContent,
    PhoneticsContent,
  },
  created() {
    console.log("mode: ", this.mode)
  },
  watch: {
    mode: function(n) {
      console.log("mode changed: ", n)
    }

  },
  data() {
    return {
      ViewMode: ViewMode
    };
  }
};
</script>