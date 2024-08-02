<template>
<div class="user-info">
  <div class="user">
    <tiny-user-head
      v-if="userStore.avatar"
      style="cursor: pointer"
      round
      v-model="userStore.avatar"
      type="image" alt="user" class="user-image"
      >
    </tiny-user-head>
    <tiny-user-head
      v-else
      style="cursor: pointer"
      round
      v-model="defaultAvatar"
      type="image" alt="user" class="user-image">
    </tiny-user-head>
    <div class="user-right">
      <div class="user-name">{{ userStore.username }}</div>
      <span>{{ userStore.description }}</span>
    </div>
  </div>

  <div class="user-setting">
    <tiny-form
      :display-only="true"
      ref="setFormRef"
      :rules="rules"
      label-width="150px"
      :label-align="true"
      label-position="left"
      size="small"
    >
      <tiny-form-item
        :label="$t('userSetting.department')"
        prop="department"
      >
        <tiny-input v-model="userStore.department"></tiny-input>
      </tiny-form-item>

      <tiny-form-item :label="$t('userSetting.job')" prop="job">
        <tiny-input v-model="userStore.job"></tiny-input>
      </tiny-form-item>

      <tiny-form-item :label="$t('userSetting.email')" prop="email">
        <tiny-input v-model="userStore.email"></tiny-input>
      </tiny-form-item>

      <tiny-form-item :label="$t('userSetting.phone')" prop="phone">
        <tiny-input v-model="userStore.phone"></tiny-input>
      </tiny-form-item>

      <tiny-form-item :label="$t('userSetting.status')" prop="status">
        <tiny-input v-model="userStore.status"></tiny-input>
      </tiny-form-item>

      <tiny-form-item :label="$t('userSetting.address')" prop="address">
        <tiny-input v-model="userStore.address"></tiny-input>
      </tiny-form-item>

      <tiny-form-item :label="$t('userSetting.username')" prop="username">
        <tiny-input v-model="userStore.username"></tiny-input>
      </tiny-form-item>

      <tiny-form-item :label="$t('userSetting.description')" prop="description">
        <tiny-input v-model="userStore.description"></tiny-input>
      </tiny-form-item>

    </tiny-form>
  </div>

  <infotab />
</div>

</template>

<script lang="ts" setup>
  import { onMounted, ref, computed } from 'vue';

  import {
    Select as TinySelect,
    Option as TinyOption,
    Input as TinyInput,
    DatePicker as TinyDatePicker,
    Button as TinyButton
  } from '@opentiny/vue';
  import {
    Form as TinyForm,
    FormItem as TinyFormItem,
    Layout as TinyLayout,
    Row as TinyRow,
    Col as TinyCol,
    UserHead as TinyUserHead, Crop as TinyCrop, Modal
  } from '@opentiny/vue';
  import { useI18n } from 'vue-i18n';

  import { IconUpload } from '@opentiny/vue-icon'
  import defaultAvatar from '@/assets/images/avatar.png'
  import {updateUserAvatar} from '@/api/user'
  import { useUserStore } from '@/store';
  import infotab from './info-tab.vue';


  const TinyIconUpload = IconUpload()
  const userStore = useUserStore();

  const { t } = useI18n();



</script>

<style scoped lang="less">
  .user-info {
    padding: 20px;
  }
  .op-button {
    display: flex;
    align-items: center;
  }
  .user-right {
    margin-left: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
  }
  .crop:deep(.tiny-crop__dialog-content__crop) {
    width: 200px;
    height: 200px;
  }
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    width: 100%;
  }

  .user-image {
    height: 72px;
    width: 72px;
    font-style: oblique;
    border-radius: 60px;
    fill: var(--ti-common-color-line-active);
    img {
      width: 72px;
      height: 72px;
    }
    .bbb {
      display: none;
    }
    &:hover {
      .bbb {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        background: rgba(59, 60, 61, 0.5);
        cursor: pointer;
      }
    }
  }

  .space {
    height: 10px;
  }

  .head-image {
    margin-top: 6px;
    padding-right: 10px;
  }
  .user-name {
    margin-bottom: 10px;
    color: black;
    font-weight: 500;
    font-size: large;
  }

  .margin-bottom {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .col {
    color: #fff;
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-lg) {
    .margin-bottom {
      margin-top: 10px;
      margin-bottom: 12px;
    }
  }
  @media (max-width: @screen-ml) {
    .margin-bottom {
      margin-top: 10px;
      margin-bottom: 12px;
    }
  }
</style>
