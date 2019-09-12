<template>
  <div>
    <div class="write-title-pane">
      <el-input size="large" class="write-title" v-model="title" placeholder="请输入标题"></el-input>
    </div>
    <div class="external-link-pane">
      <el-input size="large" class="write-title" v-model="title" placeholder="请输入链接URL"></el-input>
    </div>
    <div class="write-editor-pane">
      <mavon-editor
        id="write-mavon-editor"
        v-model="content"
        placeholder="请输入正文..."
        :boxShadow="false"
      ></mavon-editor>
      <br />
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