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
          <label id="message-label">{{errmsg}}</label>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="login">{{$t('login')}}</el-button>
        </el-form-item>
        <el-form-item>
          还没有注册？ 请点击 
          <router-link to="/user/register">注册</router-link>

        </el-form-item>
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
      },
      errmsg : ''
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
      let username = this.form.username;
      this.$axios
        .post(loginUrl, this.form)
        .then(res => {
          let token = res.data.token;
          let expire = res.data.expire;
          let user = {
            token : token,
            expire: expire,
            username : username
          }
          self.$store.dispatch("login", user);
          self.$router.push('/home')
        })
        .catch(err => {
          self.errmsg = '登陆失败！用户名或密码错误，请重新登录'
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

#message-label
  color red
</style>
