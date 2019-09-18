<template>
  <div class="tag-select-pane">
    <multiselect
      label="tag"
      track-by="id"
      v-model="tags"
      :options="options"
      :searchable="true"
      :close-on-select="false"
      :show-labels="false"
      :multiple="true"
      :taggable="true"
      @tag="addTag"
      placeholder="选择或新建标签"
    ></multiselect>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
export default {
  props: ["kind"],
  components: {
    Multiselect
  },
  data() {
    return {
      tags: [],
      options: []
    };
  },
  methods: {
    addTag(newTag) {
      let t = {
        id: "",
        kind: Number(this.kind),
        tag: newTag
      };
      this.options.push(t);
      this.tags.push(t);
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>