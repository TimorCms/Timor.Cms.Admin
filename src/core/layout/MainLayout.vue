<template>
  <!-- <a-layout class="main-layout">
  
    <a-layout>
      <cms-header class="layout-header"></cms-header>
      <div class="layout-body">
      
      </div>
    
    </a-layout>
  </a-layout>-->
  <a-layout class="main-layout">
    <cms-side v-bind:collapsed="menuStatus"></cms-side>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="menuStatus ? 'menu-unfold' : 'menu-fold'"
          @click="()=> menuStatus = !menuStatus"
        />
      </a-layout-header>
      <a-layout-content class="layout-body">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import { CmsSide, CmsHeader } from "./index";
export default {
  name: "MainLayout",
  components: { CmsSide, CmsHeader },
  data() {
    return {
      menuStatus: false
    };
  }
};
</script>

<style lang="less" >
.main-layout {
  background: #f0f2f5;
  height: 100%;
  .layout-side {
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  }
  .ant-layout-header {
    .trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color 0.3s;
    }
    .trigger:hover {
      color: #1890ff;
    }
  }
  .layout-body {
    position: relative;
    transition: all 0.2s;
    margin: 16px;
    background: #fff;
    min-height: 280px;
  }
}
</style>
