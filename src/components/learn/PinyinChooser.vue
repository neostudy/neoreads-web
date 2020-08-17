<template>
  <span>
    <el-radio-group :value="value" @input="onInput">
      <el-radio v-for="py in pinyins" :label="py" :key="py">{{py}}</el-radio>
    </el-radio-group>
    &nbsp;
    <ri-button size="small" i="check" @click="save">
    </ri-button>
  </span>
</template>

<script>
import RiButton from "../tools/RIButton.vue";
export default {
  props: ["pinyins", "value"],
  components: {
    RiButton
  },
  data() {
    return {
      pvalue: ""
    };
  },
  methods: {
    onInput(event) {
      this.pvalue = event;
      this.$emit('input', event);
    },
    save() {
      this.$emit('save', this.pvalue);
    }
  }
};
</script>