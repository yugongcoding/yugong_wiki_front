<template>
<div class="user-info">
  <div class="user">
    <tiny-user-head
      v-if="userStore.avatar"
      style="cursor: pointer"
      round
      v-model="userStore.avatar"
      type="image" alt="user" class="user-image"
      @click="avatarVisible = !avatarVisible">
      <div class="bbb">
        <TinyIconUpload />
      </div>
    </tiny-user-head>
    <tiny-user-head
      v-else
      style="cursor: pointer"
      round
      v-model="defaultAvatar"
      type="image" alt="user" class="user-image"
      @click="avatarVisible = !avatarVisible">
      <div class="bbb">
        <TinyIconUpload />
      </div>
    </tiny-user-head>
    <div class="user-right">
      <div class="user-name">{{ userStore.username }}</div>
      <span>{{ userStore.description }}</span>
    </div>
  </div>

  <div class="user-setting">
    <tiny-form
      ref="setFormRef"
      :model="state"
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
        <tiny-input v-model="state.department"></tiny-input>
      </tiny-form-item>

      <tiny-form-item :label="$t('userSetting.job')" prop="job">
        <tiny-input v-model="state.job"></tiny-input>
      </tiny-form-item>

      <tiny-form-item :label="$t('userSetting.email')" prop="email">
        <tiny-input v-model="state.email"></tiny-input>
      </tiny-form-item>

      <tiny-form-item :label="$t('userSetting.phone')" prop="phone">
        <tiny-input v-model="state.phone"></tiny-input>
      </tiny-form-item>

      <tiny-form-item :label="$t('userSetting.status')" prop="status">
        <tiny-input v-model="state.status"></tiny-input>
      </tiny-form-item>

      <tiny-form-item :label="$t('userSetting.address')" prop="address">
        <tiny-input v-model="state.address"></tiny-input>
      </tiny-form-item>

      <tiny-form-item :label="$t('userSetting.username')" prop="username">
        <tiny-input v-model="state.username"></tiny-input>
      </tiny-form-item>

      <tiny-form-item :label="$t('userSetting.description')" prop="description">
        <tiny-input v-model="state.description" type='textarea'></tiny-input>
      </tiny-form-item>

    </tiny-form>
  </div>

  <div class="op-button">
    <tiny-button
      type="primary"
      native-type="submit"
      @click="handleSubmit"
      >{{ $t('userSetting.save') }}</tiny-button
    >
    <tiny-button @click="setReset">
      {{ $t('userSetting.reset') }}
    </tiny-button>
  </div>
</div>



  <div class="crop">
    <tiny-crop
      ref='crop'
      :cropvisible="avatarVisible"
      @update:cropvisible="avatarVisible = $event"
      :src="userStore.avatar?userStore.avatar:defaultAvatar"
      :aspect-ratio="1 / 1"
      :center="true"
      :preview="true"
      :quality="0.5"
      max-size="10240KB"
      @cropend=cropend
      @cropdata="cropdata"
      enable
    ></tiny-crop>
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

  const TinyIconUpload = IconUpload()
  const userStore = useUserStore();

  const crop = ref()
  const cropend = () => {
    crop.value.state.cropImg = crop.value.getCroppedCanvas().toDataURL()
  }
  const cropdata = async (data: any) => {
    Modal.confirm('您确定要使用此图片作为头像吗？').then(async (confirmFlag) => {
    if (confirmFlag === 'confirm') {
      let Params = {
          avatar: data
      }
      let res = await updateUserAvatar(Params)
      userStore.setInfo(res.data)
      avatarVisible.value = false
      Modal.message({
        message: '头像已更新',
        status: 'success',
      });
    }
    }
    )
  }
  const avatarVisible = ref(false)

  onMounted(() => {
    userStore.info();
  });


  async function handleSubmit() {
    let data = setData();
    if (setFormValid()) {
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
      setReset();
    } else {
      Modal.message({
        message: t('baseForm.form.submit.error'),
        status: 'error',
      });
    }
  }

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
