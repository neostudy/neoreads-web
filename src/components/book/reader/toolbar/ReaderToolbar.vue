<template>
  <div class="reader-toolbar">
    <el-button @click="toggleTOC" type="icon" icon="el-icon-s-unfold" size="small" circle></el-button>
    <el-radio-group v-model="readingMode" size="small" class="reader-tool">
      <el-radio-button label="1">自由阅读</el-radio-button>
      <el-radio-button label="2">句读模式</el-radio-button>
      <el-radio-button label="3">双语对照</el-radio-button>
    </el-radio-group>
    <ruby-switch class="reader-tool" @is-ruby="$emit('is-ruby', $event)"></ruby-switch>
    <el-button-group id="page-buttons">
      <el-button @click="prevPage" size="small" plain icon="el-icon-arrow-left"></el-button>
      <el-button @click="nextPage" size="small" plain>
        <i class="el-icon-arrow-right el-icon--right"></i>
      </el-button>
    </el-button-group>

    <el-button id="reader-setting" type="icon" icon="el-icon-setting" size="small" circle></el-button>
  </div>
</template>

<script>
import RubySwitch from "./RubySwitch";
import { EVENT_BUS } from "src/eventbus.js";
export default {
  components: {
    RubySwitch
  },
  data() {
    return {
      dialogVisible: false,
      popVisible: false,
      readingMode: "2"
    };
  },
  created() {},
  methods: {
    handleClose(done) {
      console.log("closed");
      done();
    },
    nextPage() {
      EVENT_BUS.$emit("NEXT_PAGE");
    },
    prevPage() {
      EVENT_BUS.$emit("PREV_PAGE");
    },
    toggleTOC() {
      EVENT_BUS.$emit("TOGGLE_TOC");
    }
  }
};
</script>

<style lang="stylus">
.reader-toolbar
  padding-left 10px
  height 49px

.reader-tool
  padding 10px

#page-buttons
  margin-left 30px

#reader-setting
  float right
  margin 10px 10px 0px 0px
</style>
