<template>
  <tiny-tooltip class="item" effect="dark" content="回到底部" placement="left">
    <div class="icon-demo">
      <TinyIconArrowDown />
    </div>
  </tiny-tooltip>
</template>

<script setup>
import { IconArrowDown } from '@opentiny/vue-icon'
import { Tooltip as TinyTooltip } from '@opentiny/vue'

const TinyIconArrowDown = IconArrowDown()
</script>


<style scoped lang="less">
.icon-demo {
  background-color: var(--ti-common-color-bg-white-normal);
  cursor: pointer;
  box-shadow: 0 1px 4px -2px rgba(0, 0, 0, .13), 0 2px 8px 0 rgba(0, 0, 0, .08), 0 8px 16px 4px rgba(0, 0, 0, .04);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 42px;
  z-index: 997;
  height: 42px;
  &:hover {
    background-color: #e7e9e8;
  }
}
.icon-demo .tiny-svg {
  // fill: #8994aa;
  font-size: 16px;
}
</style>
