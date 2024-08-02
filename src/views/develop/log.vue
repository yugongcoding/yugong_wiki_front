<template>
  <tiny-bulletin-board title="公告" :tab-title="tabTitle" :data="data"></tiny-bulletin-board>
</template>

<script setup lang="jsx">
import { ref } from 'vue'
import { BulletinBoard as TinyBulletinBoard } from '@opentiny/vue'

const tabTitle = ref(['WIKI 更新日志', '用户群体', 'WIKI 特性'])
const data = ref([
  [
    {
      text: 'WIKI v1.1 版本',
      date: '2024-07-01',
      url: '',
      target: '_blank'
    },{
      text: 'WIKI v1.0 版本',
      date: '2024-06-07',
      url: '',
      target: '_blank'
    }
  ],
  [
    {
      text: 'YuGong',
      url: '',
      date: '2024-07-01',
      route: 'Alert'
    }
  ],
  [
    {
      text: '所见即所得',
      date: '2024-07-01',
      url: '',
      target: '_blank'
    }
  ]
])
</script>
