<template>
  <div>
    <div class="external-title-pane">
      <el-input size="large" class="write-title" v-model="title" placeholder="请输入标题"></el-input>
    </div>
    <div class="external-link-pane">
      <el-input size="large" class="write-title" v-model="title" placeholder="请输入链接URL"></el-input>
    </div>
    <div class="toolbar">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="cancel()">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    save() {},
    cancel() {}
  }
};
</script>