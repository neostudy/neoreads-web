<template>
  <div id="translation-editor" v-show="show">
    <div class="editor-table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="text" label="原文"></el-table-column>
        <el-table-column label="译文">
          <template slot-scope="scope">
            <el-input v-model="scope.row.translation"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="toolbar">
      <el-button type="primary">提交</el-button>
      <el-button>取消</el-button>
      <el-button class="right">机器翻译</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["show", "para"],
  data() {
    return {
      machineTranslation: "译文",
      tableData: [
        {
          text: "a",
          translation: "b"
        },
        {
          text: "a",
          translation: "b"
        }
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
#translation-editor
  margin-top 10px
  border-top 1px solid #C6E2FF

  .editor-table
    margin-bottom 10px

  .toolbar
    margin-top 5px

    .right
      float right
</style>