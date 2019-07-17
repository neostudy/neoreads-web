<template>
  <div>
    <div class="center">
      <h2 class="title">{{$t('login')}} {{$t('sitename')}}</h2>
      <br />
      <el-form ref="form" :model="form" label-width="80px" label-position="top">
        <el-form-item label="用户">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <label id="message-label"></label>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="login">{{$t('login')}}</el-button>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  created() {
    console.log("token:", this.$store.getters.token);
  },
  methods: {
    login() {
      console.log("login:", this.form);
      let loginUrl = "/api/v1/token/login";
      let self = this;
      this.$axios
        .post(loginUrl, this.form)
        .then(res => {
          let token = res.data.token;
          let expire = res.data.expire;
          self.$store.dispatch("saveToken", token);
          self.$store.dispatch("saveExpire", expire);
          self.$router.push('/home')
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
div.center
  margin 0px auto
  margin-top 100px
  width 500px
  text-align left

  label
    float left

  h2.title
    text-align center
    margin-left 0px
    color #409EFF

  button.submit
    margin-top 10px
    width 100%
</style>
