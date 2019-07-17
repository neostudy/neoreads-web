<template>
  <div>
    <div class="center">
      <h2 class="title">{{$t('register')}} {{$t('sitename')}}</h2>
      <br />
      <el-form ref="form" :model="form" label-width="80px" label-position="top">
        <el-form-item label="用户">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="重复密码">
          <el-input v-model="password2" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <label id="message-label">{{errmsg}}</label>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="register">{{$t('register')}}</el-button>
        </el-form-item>
        <el-form-item>
          已经注册？ 请点击
          <router-link to="/user/login">登录</router-link>
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
        password: "",
        email: ""
      },
      password2: "",
      errmsg: ""
    };
  },
  created() {
    this.$store.dispatch("setActiveMenuIndex", "/none");
    console.log("token:", this.$store.getters.token);
  },
  methods: {
    checkPasswords() {
      if (this.form.password == '') {
        this.errmsg = "请填写密码";
        return false;
      }
      if (this.password2 == '') {
        this.errmsg = "请填写重复密码";
        return false;
      }
      if (this.form.password != this.password2) {
        this.errmsg = "两次输入的密码不一致";
        return false;
      } else {
        return true;
      }
    },
    register() {
      if (!this.checkPasswords()) {
        return;
      }
      let loginUrl = "/api/v1/user/register";
      let self = this;
      this.$axios
        .post(loginUrl, this.form)
        .then(res => {
          self.$message("注册成功，请登录")
          self.$router.push("/user/login");
        })
        .catch(err => {
          self.errmsg = "注册失败：用户名或密码错误。请重新填表注册。";
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
