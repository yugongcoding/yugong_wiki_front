<template>
  <div class="createTeamSpace">
    <tiny-button
      type="primary"
      native-type="submit"
      @click="click"
      >{{ $t('space.team.createTeamSpace') }}
    </tiny-button>
    <hr>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { iconWarning } from '@opentiny/vue-icon'
import {
  Button as TinyButton,
  } from '@opentiny/vue';
import { teamStore } from '@/store';

const click = () => {
  team.authDisabled = false
  team.showDialog = true
  team.flag = 'create'
}
const team = teamStore()

</script>

<style scoped lang="less">
.createTeamSpace {
  width: 98%;
  margin: 0 auto;
}
</style>

