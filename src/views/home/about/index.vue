<template>
  <div class="about">
    <h1>个人或企业知识库平台</h1>
    <h2>开源、免费、协作</h2>
    <h2>点击下方按钮</h2>
    <h2>成为开发者</h2>
    <tiny-button type="primary" size="large" class="button" @click="baseClick"><span>加入我们</span></tiny-button>
  </div>
</template>

<script setup>
import { Button as TinyButton, Modal  } from '@opentiny/vue'

function baseClick() {
  Modal.message({ status: 'info', message: '查看底部联系方式，加入我们' })
}
</script>

<style scoped>
.about {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: auto;
}
</style>

