<template>
  <div class="container-set">
    <div class="general-card">
      <div class="general-top">
        <headtop></headtop>
      </div>
        <div class="general-content">
          <infotab></infotab>
        </div>
      </div>
    </div>
</template>

<script lang="ts" setup>
  import infotab from './components/info-tab.vue';
  import headtop from './components/head.vue';
</script>

<style scoped lang="less">
.container-set {
  min-width: 1280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // width: 98%;
  height: inherit;
  margin: 0 0 0 10px;

  .general-card {
    height: 100%;
    padding: 10px;
    overflow-x: hidden;
    overflow-y: auto;
    border-radius: 10px;

    .general-top {
      display: flex;
      justify-content: space-around;
      min-height: 202px;
      margin: 0 -12px;
      overflow: hidden;
      background-image: url('@/assets/images/step-head.png');
      background-size: 100% 100%;
    }

    .general-contain {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      min-height: 75%;
      padding: 30px 0 10px 20px;
      color: black;
      background-color: #fff;
      border-radius: 10px;

      .tiny-layout {
        width: 80%;
      }
    }

    .general-btn {
      position: relative;
      left: 160px;

      button {
        width: 100px;
        height: 36px;
        border-radius: 4px;
      }
    }

    .margin-bottom {
      margin: 15px 0;
    }

    .col {
      padding: 4px 0;
      color: #fff;
    }
  }
}
</style>
