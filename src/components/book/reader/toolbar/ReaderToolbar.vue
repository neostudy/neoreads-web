<template>
  <div class="reader-toolbar">
    <ruby-switch></ruby-switch>
  </div>
</template>

<script>
import RubySwitch from "./RubySwitch";
export default {
  components: {
    RubySwitch
  },
  data() {
    return {
      dialogVisible: false,
      popVisible: false
    };
  },
  methods: {
    handleClose(done) {
      console.log("closed");
      done();
    }
  }
};
</script>

<style>
</style>
