<template>
  <div>
    <router-view />
    <global-setting />
  </div>
</template>

<script lang="ts" setup>
  import { provide } from 'vue';
  import useMobileHook from '@/hooks/mobile'
  import * as echarts from 'echarts';
  import GlobalSetting from '@/components/global-setting/index.vue';

  provide('echarts', echarts);
  useMobileHook()
  let welcome = `
 ______________________
< Welome To YuGongWiki >
 ----------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||

  `
  console.log(welcome)
</script>

<style lang="less" scoped>
@import '@/assets/style/self.less'; /* 引入公共样式 */
</style>
