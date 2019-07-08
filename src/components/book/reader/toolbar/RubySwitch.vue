<template>
  <div class="ruby-switch">
    <label>{{$t('switch-ruby')}}&nbsp;</label>
    <el-switch v-model="isRuby"></el-switch>
  </div>
</template>

<script>
import { toPinyin } from "src/js/phonetics/pinyingen";

export default {
  props: ["lines"],
  data() {
    return {
      isRuby: false,
      pinyinLines: []
    };
  },
  created() {},
  watch: {
    isRuby: function(newValue, oldValue) {
      if (newValue != oldValue) {
        this.$emit("is-ruby", newValue);
        /*
        if (newValue) {
          this.addPinyin();
        } else {
          this.removePinyin();
        }
        */
      }
    }
  },
  methods: {
    addPinyin() {
      var panel = document.getElementById("reader-content-panel");
      panel.classList.add("ruby");
      var paras = panel.getElementsByTagName("p");
      for (let p of paras) {
        p.setAttribute("origtext", p.innerText);
        var rubies = [];
        var pys = toPinyin(p.innerText).flat();
        for (let i = 0; i < p.innerText.length; ++i) {
          var py = pys[i];
          var ch = p.innerText[i];
          if (py != ch) {
            var ruby = `<rb>${ch}<rt>${py}`;
            rubies.push(ruby);
          } else {
            var ruby = `<rb>${ch}<rt>`;
            rubies.push(ruby);
          }
        }
        var html = "<ruby>" + rubies.join("") + "</ruby>";
        p.innerHTML = html;
      }
    },
    removePinyin() {
      var panel = document.getElementById("reader-content-panel");
      panel.classList.remove("ruby");
      var paras = panel.getElementsByTagName("p");
      for (let p of paras) {
        var origtext = p.getAttribute("origtext");
        if (origtext && origtext.length > 0) {
          p.innerHTML = origtext;
        }
      }
    },
    switchRuby() {
      if (!this.isRuby) {
        this.addPinyin();
      } else {
        this.removePinyin();
      }
      this.isRuby = !this.isRuby;
    }
  }
};
</script>

<style lang="stylus" scoped>
.ruby-switch
  display inline-block

  label
    font-size 13px
</style>



