<template>
  <div class="container">
    <div class="contain">
      <tiny-breadcrumb :options="options"></tiny-breadcrumb>
      <createBookSpace></createBookSpace>
      <Main></Main>
    </div>
  </div>
  <Dialog />

</template>

<script lang="ts" setup>
import {ref} from 'vue'
import { useI18n } from 'vue-i18n';

import { Breadcrumb as TinyBreadcrumb } from '@opentiny/vue'
import Main from './components/main.vue';
import createBookSpace from './components/createBookSpace.vue'
import Dialog from './components/dialog.vue';

const { t } = useI18n();

const options = ref([
  {
    label: t('menu.space'),
    to: { path: '/space/team' }
  },
  {
    label: t('space.team.teamSpace'),
    to: { name: '/space/book' }
  }
])
</script>

<style scoped lang="less">
.container {
  width: 100%;
  margin: 0;
}
.contain {
  width: 1212px;
  height: inherit;
  margin: 0 0;
}
</style>

<style lang="less" scoped>
@media (max-width: @screen-ml) {
  .contain {
    width: 404px;
    display: flex;
    max-width: 100%;
    flex-direction: column;
    align-items: flex-start;
    &:deep(.card) {
      max-width: 100%;
    }
  }
}
@media screen and (min-width: @screen-ml) and (max-width: @screen-sm) {
  .contain {
    width: 808px;
    height: inherit;
  }
}
@media (min-width: @screen-sm) {
  .contain {
    width: 1212px;
    height: inherit;
    margin: 0 0;
  }
}
</style>
