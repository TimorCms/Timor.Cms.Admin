<template>
  <div class="login-content">
    <div class="main">
      <div class="header">
        <img src="../../assets/logo.png" />
        <span>Timor CMS</span>
      </div>
      <a-form-model :model="formInline" @submit="handleSubmit" @submit.native.prevent>
        <a-form-model-item>
          <a-input v-model="formInline.loginName" placeholder="用户名" size="large">
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input v-model="formInline.password" type="password" placeholder="密码" size="large">
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-button
            type="primary"
            html-type="submit"
            size="large"
            :disabled="formInline.loginName === '' || formInline.password === ''"
          >登录</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>
<script>
import { loginService } from "../../core/services";

export default {
  data() {
    return {
      formInline: {
        loginName: "",
        password: ""
      }
    };
  },
  methods: {
    handleSubmit(e) {
      this.$http
        .post("/api/v1/accounts/token", this.formInline)
        .then(res => {
          this.$notification.success({
            message: "登录成功",
            description: ""
          });
          loginService.login(res);
          this.$router.push("dashboard");
        })
        .catch(reason => {
          console.log(123);
          this.$notification.error({
            message: "登录失败",
            description: reason.errorMessage
          });
        });
    }
  },
  created() {
    if (loginService.isLogin()) {
      this.$router.push("dashboard");
    }
  }
};
</script>
<style lang="less" scoped>
.login-content {
  position: relative;
  width: 520px;
  max-width: 100%;
  width: 100%;
  min-height: 100%;
  padding: 160px 35px 0;
  margin: 0 auto;
  overflow: hidden;
  background: #f0f2f5 url(../../assets/background.svg) no-repeat 50%;
  background-size: 100%;
  .header {
    margin: 10px auto;
    text-align: center;
    height: 66px;
    line-height: 66px;
  }
  .header img {
    width: 66px;
  }
  .header span {
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-weight: 600;
    font-size: 33px;
    color: #000000;
    top: 8px;
    margin-left: 5px;
    position: relative;
  }
  .main {
    width: 368px;
    min-width: 260px;
    margin: 0 auto;
  }
  .login-form {
    text-align: center;
    width: 368px;
    margin: auto;
  }
  .ant-btn {
    width: 100%;
    padding: 0;
  }
}
</style>