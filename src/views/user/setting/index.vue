<template>
  <div class="container-set">
    <Breadcrumb :items="['menu.user', 'menu.user.setting']" />
    <div class="general-card">
      <div class="general-top">
        <headtop></headtop>
      </div>
      <div class="general-contain">
        <setFrom ref="setFormRef"></setFrom>
        <div class="general-btn">
          <tiny-button
            type="primary"
            native-type="submit"
            @click="handleSubmit"
            >{{ $t('userSetting.save') }}</tiny-button
          >
          <tiny-button @click="handleFormReset">
            {{ $t('userSetting.reset') }}
          </tiny-button>
        </div>
      </div>
    </div>
  </div>

  <div class="m-container-set">
    <Breadcrumb :items="['menu.user', 'menu.user.setting']" />
    <MuserSetting />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Button as TinyButton, Modal } from '@opentiny/vue';
  import { getSimpleDate } from '@/utils/time';
  import { useUserStore } from '@/store';
  import headtop from './components/head.vue';
  import setFrom from './components/set-from.vue';
  import MuserSetting from './components/m-user-setting.vue';


  const { t } = useI18n();
  const setFormRef = ref();
  const userStore = useUserStore();

  // btn操作
  function handleFormReset() {
    setFormRef.value.setReset();
  }

  async function handleSubmit() {
    let data = setFormRef.value.setData();
    if (setFormRef.value.setFormValid()) {
      let newTemp = {
        username: data.username,
        description: data.description,
        address: data.address,
        department: data.department,
        job: data.job,
        email: data.email,
        phone: data.phone,
        status: data.status
      };
      await userStore.updateInfo(newTemp);
      Modal.message({
        message: '更新成功',
        status: 'success',
      });
      handleFormReset();
    } else {
      Modal.message({
        message: t('baseForm.form.submit.error'),
        status: 'error',
      });
    }
  }
</script>

<style scoped lang="less">
.container-set {
  min-width: 1280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // width: 98%;
  height: inherit;
  margin: 0 0 0 10px;

  .general-card {
    height: 100%;
    padding: 10px;
    overflow-x: hidden;
    overflow-y: auto;
    border-radius: 10px;

    .general-top {
      display: flex;
      justify-content: space-around;
      min-height: 202px;
      margin: 0 -12px;
      overflow: hidden;
      background-image: url('@/assets/images/step-head.png');
      background-size: 100% 100%;
    }

    .general-contain {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      min-height: 75%;
      padding: 30px 0 10px 20px;
      color: black;
      background-color: #fff;
      border-radius: 10px;

      .tiny-layout {
        width: 80%;
      }
    }

    .general-btn {
      position: relative;
      left: 160px;

      button {
        width: 100px;
        height: 36px;
        border-radius: 4px;
      }
    }

    .margin-bottom {
      margin: 15px 0;
    }

    .col {
      padding: 4px 0;
      color: #fff;
    }
  }
}
</style>


<style scoped lang="less">
  .m-container-set {
    display: none;
  }
</style>

<style lang="less" scoped>
  @media (max-width: @screen-mm) {
    .m-container-set {
      display: block;
    }
    .container-set {
      display: none;
    }
  }
  @media (min-width: @screen-mm) {
    .m-container-set {
      display: none;
    }
    .container-set {
      display: block;
    }
  }
</style>
