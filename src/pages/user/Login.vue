<template>
    <div class="login-content">
      <div>CMS系统登录</div>
      <a-form-model :model="formInline" @submit="handleSubmit" @submit.native.prevent>
        <a-form-model-item>
          <a-input v-model="formInline.user" placeholder="Username">
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input v-model="formInline.password" type="password" placeholder="Password">
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-button
            type="primary"
            html-type="submit"
            :disabled="formInline.user === '' || formInline.password === ''"
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
        user: "admin",
        password: "admin"
      }
    };
  },
  methods: {
    handleSubmit(e) {
      httpClient
        .post("https://localhost:5001/api/v1/accounts/token", {
          userName: "string",
          password: "string"
        })
        .then(res => {
          console.log(res);
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