<template>
  <div class="notes-pane">
    <div v-show="viewMode == ViewMode.Phonetics">
      <phonetics-notes :select="select" :notes="notes"></phonetics-notes>
    </div>
  </div>
</template>

<script>
import PhoneticsNotes from "./PhoneticsNotes.vue";
import {ViewMode} from "src/js/constants.js";
export default {
  props: ["select", "viewMode", "notes"],
  components: {
    PhoneticsNotes
  },
  data() {
    return {
      ViewMode: ViewMode
    }
  }
}
</script>