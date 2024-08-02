<template>
  <Nav />
  <div class="main">
    <div class="content">
      <router-view v-slot="{ Component, route }">
        <component :is="Component" :key="route.fullPath" />
      </router-view>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import Nav from './components/navbar.vue'
import Footer from './components/footer.vue'

</script>

<style scoped lang="less">
.main {
  height: calc(100vh - 60px);
  height: calc(var(--vh, 1vh) * 100 - 60px);
  overflow: auto;
}
.content {
  min-height: calc(100vh - 60px - 80px);
  min-height: calc(var(--vh, 1vh) * 100 - 60px - 80px);
  overflow: auto;
}
</style>
