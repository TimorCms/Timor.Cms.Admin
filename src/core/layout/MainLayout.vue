<template>
  <div class="main-layout">
    <el-container>
      <cms-side class="layout-side"></cms-side>
      <el-container>
        <cms-header class="layout-header"></cms-header>
        <div class="layout-body">
          <router-view></router-view>
        </div>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { CmsSide, CmsHeader } from "./index";
export default {
  name: "MainLayout",
  components: { CmsSide, CmsHeader }
};
</script>

<style lang="less">
.main-layout {
  background: #f0f2f5;
  height: 100%;
  .layout-header {
    height: 64px;
    background: #fff;
  }
  .layout-body {
    position: relative;
    margin: 24px;
    transition: all 0.2s;
  }
  .el-container {
    height: 100%;
    margin-bottom: 0px;
    .layout-side {
      background: #fff;
      width: 240px;
      overflow-y: auto;
      box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    }
  }
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
