<template>
  <div class="createBookSpace">
    <tiny-button
      type="primary"
      native-type="submit"
      @click="click"
      >{{ $t('space.book.createBookSpace') }}
    </tiny-button>
    <hr>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n';
import { iconWarning } from '@opentiny/vue-icon'
import {
  Button as TinyButton,
  } from '@opentiny/vue';
import { useRoute, useRouter } from 'vue-router';
import { bookStore } from '@/store';

const book = bookStore()
const route = useRoute()

const click = () => {
  book.authDisabled = false
  book.showDialog = true
  book.flag = 'create'
  // book.createData.team = route.query.teamId?parseInt(route.query.teamId, 10): null
}
onMounted(() => {
  book.teamId = route.query.teamId?parseInt(route.query.teamId, 10): null
  book.getBookSpaceData()
  book.getTeamSpaceData()
})

</script>

<style scoped lang="less">
.createBookSpace {
  width: 98%;
  margin: 0 auto;
}
</style>

