<template>
  <div class="locale-changer">
    <el-select v-model="$i18n.locale" size="medium">
      <el-option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang" :label="$t(lang)"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "locale-changer",
  data() {
    return { langs: ["en", "zh"] };
  },
  watch: {
    "$i18n.locale"() {
      console.log(this.$i18n.locale);

      let sitename = this.$t("sitename");
      document.title = sitename;
    }
  }
};
</script>

<style lang="stylus" scoped>
.locale-changer
  width 90px
</style>