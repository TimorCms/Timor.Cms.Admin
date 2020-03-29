<template>
  <a-layout-sider class="layout-side" :trigger="null" collapsible v-model="collapsed">
    <div class="logo" />
    <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
      <a-menu-item key="1">
        <router-link to="/dashboard">
          <a-icon type="user" />
          <span>Dashboard</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="2">
        <router-link to="/news/list">
          <a-icon type="video-camera" />
          <span>NEWS</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="3">
        <a-icon type="upload" />
        <span>LOGO</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>
<script>
export default {
  props: ["collapsed"],
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="less" >
.layout-side {
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
}
</style>