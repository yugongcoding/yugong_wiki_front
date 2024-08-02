<template>
  <div class="container">
    <div class="content">
      <div class="content-main">
        <img src="@/assets/images/error.png" alt="error" />
        <div>
          <div>{{ message }}</div>
          <div>{{ $t('error.result.title') }}</div>
        </div>
        <div class="result-btn">
          <tiny-button
            type="primary"
            native-type="submit"
            @click="handleSubmit"
            >{{ $t('error.result.home') }}</tiny-button
          >
          <tiny-button @click="handleFormReset">
            {{ $t('menu.btn.cancel') }}
          </tiny-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  Button as TinyButton,
  TimeLine as TinyTimeLine,
  Modal,
} from '@opentiny/vue';
import { string } from 'fp-ts';

const props = defineProps({
  message: {
    type: String,
    required: true
  }
})

</script>

<style scoped lang="less">
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 98%;
    height: inherit;
    margin: 0 auto;
    overflow: hidden;

    :deep(.tiny-steps) {
      margin-top: 10px;
    }
  }

  .content {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    overflow: auto;
    background: #fff;
    border-radius: 10px;
  }

  .content-main {
    padding: 75px 0;
  }

  .result-alert {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    color: black;
    text-align: center;

    img {
      width: 68px;
      height: 68px;
      margin: 0 auto;
    }

    div:first-child {
      padding-top: 50px;
      font-weight: 900;
      font-size: 20px;
    }

    div:last-child {
      padding-top: 20px;
      font-size: 14px;
    }
  }

  .result-line {
    width: 75%;
    height: 200px;
    margin: 0 auto;
    margin-top: 50px;
    color: black;
    background-color: #f5f6f7;

    div:first-child {
      padding: 20px;
    }
  }

  .result-btn {
    display: flex;
    justify-content: center;
    padding: 50px 0;

    button {
      width: 120px;
      height: 36px;
      border-radius: 4px;
    }
  }
</style>
