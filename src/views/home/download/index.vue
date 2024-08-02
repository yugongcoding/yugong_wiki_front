<template>
  <div class="download">
    <h1>个人或企业知识库平台</h1>
    <h2>开源、免费、协作</h2>
    <h2>一端多用</h2>
  </div>

  <div class="downlaod-software">
    <div class="download-app">
      <WindowsOutlined class="svg" />
      <tiny-button
        style="padding: 0 10px"
        type="primary"
        size="medium"
        class="button"
        @click="baseClick">
        下载 Windows 桌面版
      </tiny-button>
    </div>
    <div class="download-app">
      <ChromeOutlined class="svg" />
      <tiny-button
        style="padding: 0 10px"
        type="primary"
        size="medium"
        class="button"
        @click="baseClick">
        下载 Chrome 访问
      </tiny-button>
    </div>
    </div>
</template>

<script setup>
import { Button as TinyButton, Modal  } from '@opentiny/vue'
import { defineComponent } from 'vue';
import {
  WindowsOutlined,
  ChromeOutlined
} from '@ant-design/icons-vue';


 defineComponent({
  components: {
    WindowsOutlined,
  ChromeOutlined
  },
});

function baseClick() {
  Modal.message({ status: 'info', message: '敬请期待~' })
}
</script>

<style scoped lang="less">
.download {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: auto;
}
.downlaod-software {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: #fafafa;
  justify-content: space-evenly;
  .download-app {
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &:deep(svg) {
    margin-bottom: 10px;
    width: 6rem;
    height: 6rem;
  }
}
</style>

<style lang="less" scoped>
// 手机  pad
@media screen and (min-width: @screen-ms) and (max-width: @screen-ml) {
  .downlaod-software {
    flex-wrap: wrap;
  }
}
</style>

