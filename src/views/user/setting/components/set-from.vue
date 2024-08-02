<template>
  <tiny-layout class="user-setting">
    <tiny-form
      ref="setFormRef"
      :model="state"
      :rules="rules"
      label-width="150px"
      :label-align="true"
      label-position="left"
      size="small"
    >
      <tiny-row :flex="true" justify="left">
        <tiny-col :span="5" label-width="100px">
          <tiny-form-item
            :label="$t('userSetting.department')"
            prop="department"
          >
            <tiny-input v-model="state.department"></tiny-input>
          </tiny-form-item>
        </tiny-col>
        <tiny-col :span="5" label-width="100px">
          <tiny-form-item :label="$t('userSetting.job')" prop="job">
            <tiny-input v-model="state.job"></tiny-input>
          </tiny-form-item>
        </tiny-col>
      </tiny-row>

      <tiny-row :flex="true" justify="left">

        <tiny-col :span="5" label-width="100px">
          <tiny-form-item :label="$t('userSetting.email')" prop="email">
            <tiny-input v-model="state.email"></tiny-input>
          </tiny-form-item>
        </tiny-col>

        <tiny-col :span="5" label-width="100px">
          <tiny-form-item :label="$t('userSetting.phone')" prop="phone">
            <tiny-input v-model="state.phone"></tiny-input>
          </tiny-form-item>
        </tiny-col>
      </tiny-row>

      <tiny-row :flex="true" justify="left">

        <tiny-col :span="5" label-width="100px">
          <tiny-form-item :label="$t('userSetting.status')" prop="status">
            <tiny-input v-model="state.status"></tiny-input>
          </tiny-form-item>
        </tiny-col>

        <tiny-col :span="5" label-width="100px">
          <tiny-form-item :label="$t('userSetting.address')" prop="address">
            <tiny-input v-model="state.address"></tiny-input>
          </tiny-form-item>
        </tiny-col>
      </tiny-row>

      <tiny-row :flex="true" justify="left">
        <tiny-col :span="5" label-width="100px">
          <tiny-form-item :label="$t('userSetting.username')" prop="username">
            <tiny-input v-model="state.username"></tiny-input>
          </tiny-form-item>
        </tiny-col>
        <tiny-col :span="5" label-width="100px">
          <tiny-form-item :label="$t('userSetting.description')" prop="description">
            <tiny-input v-model="state.description" type='textarea'></tiny-input>
          </tiny-form-item>
        </tiny-col>
      </tiny-row>
    </tiny-form>
  </tiny-layout>
</template>
<script lang="ts" setup>
  import { ref, reactive, defineProps, computed, defineExpose } from 'vue';
  import { useI18n } from 'vue-i18n';
  import defaultAvatar from '@/assets/images/avatar.png'
  import {
    Select as TinySelect,
    Option as TinyOption,
    Layout as TinyLayout,
    Form as TinyForm,
    FormItem as TinyFormItem,
    Row as TinyRow,
    Col as TinyCol,
    Input as TinyInput,
    DatePicker as TinyDatePicker,
    Modal,Crop as TinyCrop,Button as TinyButton
  } from '@opentiny/vue';
  import { useUserStore } from '@/store';
  import { values } from 'fp-ts/lib/ReadonlyMap';

  const userStore = useUserStore();

  const projectData = [
    {
      value: 1,
      label: '社招',
    },
    {
      value: 2,
      label: '校招',
    },
    {
      value: 3,
      label: '调岗',
    },
  ];

  // 加载效果
  const state = ref({
    username: userStore.username,
    description: userStore.description,
    department: userStore.department,
    email: userStore.email,
    job: userStore.job,
    phone: userStore.phone,
    status: userStore.status,
    address: userStore.address
  })

  // 初始化请求数据
  const setFormRef = ref();
  const { t } = useI18n();

  // 校验规则
  const rulesType = {
    required: true,
    trigger: 'blur',
  };
  const rulesSelect = {
    required: true,
    message: '必选',
    trigger: 'blur',
  };
  const rules = computed(() => {
    return {
      description:[rulesType],
      address: [rulesType],
      department: [rulesType],
      job: [rulesType],
      type: [rulesSelect],
      date: [rulesType],
      during: [rulesType],
      startTime: [rulesType],
      endTime: [rulesType],
    };
  });

  const setFormValid = () => {
    let setValidate = false;
    setFormRef.value.validate((valid: boolean) => {
      setValidate = valid;
    });

    return setValidate;
  };

  const setReset = () => {
    state.value = {
      username: userStore.username,
      description: userStore.description,
      department: userStore.department,
      email: userStore.email,
      job: userStore.job,
      phone: userStore.phone,
      status: userStore.status,
      address: userStore.address
    }
  }

  const setData = () => {
    return state.value;
  };

  defineExpose({
    setData,
    setFormValid,
    setReset,
  });
</script>

<style scoped lang="less">
  .user-setting:deep(.tiny-crop__dialog-content__crop) {
    width: 200px;
    height: 200px;
  }
  :deep(.tiny-row) {
    margin-bottom: 15px;
  }
</style>
