<template>
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
    <div>
      <h3 class="user-label m-user-label">{{ $t('stepForm.head.admin') }}</h3>
      <h3 class="user-name m-user-name">{{ userStore.username }}</h3>
    </div>
  </div>
  <div class="divider"></div>
  <div class="user-content">
    <tiny-layout>
      <tiny-row :flex="true" justify="center" class="margin-bottom">
        <img src="@/assets/images/head-1.png" class="head-image" />
        <tiny-col :span="6">
          <div class="col">
            <div>{{ $t('stepForm.recruitment.department') }}</div>
            <div class="space"></div>
            <div>{{ userStore.department }}</div>
          </div>
        </tiny-col>
        <img src="@/assets/images/head-2.png" class="head-image" />
        <tiny-col :span="6">
          <div class="col">
            <div>{{ $t('stepForm.recruitment.type') }}</div>
            <div class="space"></div>
            <div>{{ userStore.employeeType }}</div>
          </div>
        </tiny-col>
        <img src="@/assets/images/head-3.png" class="head-image" />
        <tiny-col :span="6">
          <div class="col">
            <div>{{ $t('stepForm.recruitment.position') }}</div>
            <div class="space"></div>
            <div>{{ userStore.job }}</div>
          </div>
        </tiny-col>
      </tiny-row>
      <tiny-row :flex="true" justify="center" class="margin-bottom">
        <img src="@/assets/images/head-4.png" class="head-image" />
        <tiny-col :span="6">
          <div class="col">
            <div>{{ $t('stepForm.email') }}</div>
            <div class="space"></div>
            <div>
              {{ userStore.email }}
            </div>
          </div>
        </tiny-col>
        <img src="@/assets/images/head-5.png" class="head-image" />
        <tiny-col :span="6">
          <div class="col">
            <div>{{ $t('stepForm.phone') }}</div>
            <div class="space"></div>
            <div>{{ userStore.phone }}</div>
          </div>
        </tiny-col>
        <img src="@/assets/images/head-6.png" class="head-image" />
        <tiny-col :span="6">
          <div class="col">
            <div>{{ $t('stepForm.status') }}</div>
            <div class="space"></div>
            <div
              >{{ userStore.status
              }}</div
            >
          </div>
        </tiny-col>
      </tiny-row>
    </tiny-layout>
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
  import { onMounted, ref } from 'vue';
  import {
    Layout as TinyLayout,
    Row as TinyRow,
    Col as TinyCol,
    UserHead as TinyUserHead, Crop as TinyCrop, Modal
  } from '@opentiny/vue';
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
</script>

<style scoped lang="less">
  .crop:deep(.tiny-crop__dialog-content__crop) {
    width: 200px;
    height: 200px;
  }
  .user-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 66%;
    padding-bottom: 8px;
  }

  .divider {
    width: 1px;
    height: 60px;
    margin: 3.8% 9% 3.8% 5%;
    background: #fff;
    opacity: 0.3;
  }

  .user {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 16%;
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
  .user-label {
    padding-left: 26px;
    color: #fff;
    font-weight: 600;
    font-size: large;
  }
  .user-name {
    padding-left: 26px;
    color: #fff;
    font-weight: 600;
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
