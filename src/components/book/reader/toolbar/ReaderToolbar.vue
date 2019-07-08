<template>
  <div class="reader-toolbar">
    <ruby-switch @is-ruby="$emit('is-ruby', $event)"></ruby-switch>
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
  created() {
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
