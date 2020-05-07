<template>
  <div class="login-content">
    <div>CMS系统登录</div>
    <a-form-model :model="formInline" @submit="handleSubmit" @submit.native.prevent>
      <a-form-model-item>
        <a-input v-model="formInline.loginName" placeholder="用户名">
          <a-icon slot="prefix" type="loginName" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input v-model="formInline.password" type="password" placeholder="密码">
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          type="primary"
          html-type="submit"
          :disabled="formInline.loginName === '' || formInline.password === ''"
        >Log in</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import httpClient from "../../core/services/httpclient";

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
      httpClient
        .post("https://localhost:5001/api/v1/accounts/token", this.formInline)
        .then(res => {
          this.$notification.success({
            message: "登录成功",
            description: ""
          });
          window.sessionStorage.setItem("session", JSON.stringify(res));
        })
        .catch(reason => {
          this.$notification.error({
            message: "登录失败",
            description: reason.errorMessage
          });
        });

      // this.$router.push("dashboard");
    }
  }
};
</script>
<style lang="less" scoped>
.login-content {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 160px 35px 0;
  margin: 0 auto;
  overflow: hidden;
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