<template>
  <div id="collection-edit-pane">
    <el-container>
      <el-header class="title-pane" height="50px">
        <span v-if="isEdit" class="title">编辑文集</span>
        <span v-if="!isEdit" class="title">新建文集</span>
      </el-header>
      <el-main>
        <div class="collection-title-pane">
          <el-input size="large" class="collection-title" v-model="title" placeholder="请输入名称"></el-input>
        </div>
        <div class="collection-intro-pane">
          <el-input
            size="large"
            class="collection-intro"
            type="textarea"
            :rows="5"
            v-model="intro"
            placeholder="请输入简介"
          ></el-input>
        </div>
        <div class="collection-select-pane">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="title" label="文章标题" width="800"></el-table-column>
            <el-table-column label="最近更新">
              <template slot-scope="scope">{{ scope.row.modtime }}</template>
            </el-table-column>
          </el-table>
        </div>
        <div class="collection-toolbar">
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="cancel()">取消</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colid: this.$route.params.colid,
      title: "",
      intro: "",
      artids: [],
      tableData: []
    };
  },
  computed: {
    isEdit() {
      return !!this.colid;
    }
  },
  created() {
    // fetch articles for selection
    this.authGet("/api/v1/articles/list").then(res => {
      this.tableData = res.data;
      if (this.isEdit) {
        // fetch collection info
        this.authGet("/api/v1/collections/get/" + this.colid).then(res => {
          let col = res.data;
          this.title = col.title;
          this.intro = col.intro;
          this.artids = col.artids;
          console.log("artids:", this.artids);
          this.selectRows(col.artids);
        });
      }
    });
  },
  methods: {
    save() {
      if (!this.title) {
        this.$alert("标题未填写", "注意：");
      } else if (!this.intro) {
        this.$alert("简介未填写", "注意：");
      } else {
        let url = "/api/v1/collections/add";
        let data = {
          title: this.title,
          intro: this.intro,
          artids: this.artids
        };
        if (this.isEdit) {
          url = "/api/v1/collections/modify";
          data.id = this.colid;
        }
        this.authPost(url, data)
          .then(res => {
            this.$message("文集保存成功");
            this.goCollections();
          })
          .catch(error => {
            this.$message("文集保存失败：" + error);
          });
      }
    },
    cancel() {
      if (this.title || this.intro) {
        this.$confirm("文集未保存，确认退出？")
          .then(_ => {
            this.goCollections();
          })
          .catch(_ => {});
      } else {
        this.goArticles();
      }
    },
    goCollections() {
      this.$router.push("/works/collections");
    },
    handleSelectionChange(selections) {
      console.log("selection changed")
      this.artids = selections.map(a => a.id);
    },
    selectRows(rowids) {
      if (this.tableData) {
        this.tableData.forEach(row => {
          console.log("row:", row.id);
          if (rowids.includes(row.id)) {
            console.log("hit:", row.id);
            this.$refs.multipleTable.toggleRowSelection(row, true);
          }
        });
      }
    }
  }
};
</script>


<style lang="stylus" scoped>
#collection-edit-pane
  text-align left
  padding 0

  .title-pane
    border-bottom 1px solid #eee
    height 50px
    line-height 50px

    span.title
      font-weight bold
      font-size 1.2em

    span.right
      float right

  .collection-title-pane
    margin-bottom 10px

  .collection-intro-pane
    margin-bottom 10px

  .collection-select-pane
    margin-bottom 10px
</style>