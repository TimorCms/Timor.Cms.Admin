<template>
  <header class="layout-header">
    <div class="header-right">
      <div class="avatar-image">
        <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />
      </div>
      <div class="name">Serati Ma</div>
    </div>
  </header>
</template>
<script>
export default {
  methods: {
    goBack() {
      console.log("go back");
    }
  }
};
</script>
<style lang="less" scoped>
.layout-header {
  .header-right {
    display: flex;
    float: right;
    height: 64px;
    margin-left: auto;
    overflow: hidden;
    padding: 0 12px;
    .avatar-image {
      margin: 20px 8px 20px 0;
      color: #1890ff;
      vertical-align: top;
      background: hsla(0, 0%, 100%, 0.85);
      img {
        height: 24px;
        width: 24px;
      }
    }
    .name {
      line-height: 64px;
    }
  }
}
</style>