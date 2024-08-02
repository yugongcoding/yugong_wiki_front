<template>
  <div class="user">
    <tiny-user-head round v-model="personalStore.avatar" type="image" alt="user" class="user-image"  v-show="personalStore.avatar"></tiny-user-head>
    <img src="@/assets/images/avatar.png" alt="user" class="user-image" v-show="!(personalStore.avatar)"/>
    <!-- <img :src="userStore.avatar" alt="user" class="user-image" /> -->
    <div>
      <h3 class="user-name">{{ $t('stepForm.head.admin') }}</h3>
      <h3 class="user-name">{{ personalStore.username }}</h3>
    </div>
  </div>
  <div class="divider"></div>
  <div class="user-content">
    <tiny-layout>
      <tiny-row :flex="true" justify="left" class="margin-bottom">
        <img src="@/assets/images/head-1.png" class="head-image" />
        <tiny-col :span="6">
          <div class="col">
            <div>{{ $t('userInfo.address') }}</div>
            <div class="space"></div>
            <div>{{ personalStore.address }}</div>
          </div>
        </tiny-col>
        <img src="@/assets/images/head-3.png" class="head-image" />
        <tiny-col :span="6">
          <div class="col">
            <div>{{ $t('userInfo.job') }}</div>
            <div class="space"></div>
            <div>{{ personalStore.job }}</div>
          </div>
        </tiny-col>
        <img src="@/assets/images/head-4.png" class="head-image" />
        <tiny-col :span="6">
          <div class="col">
            <div>{{ $t('userInfo.email') }}</div>
            <div class="space"></div>
            <div>
              {{ personalStore.email }}
            </div>
          </div>
        </tiny-col>
      </tiny-row>
      <tiny-row :flex="true" justify="left" class="margin-bottom">
        <img src="@/assets/images/head-4.png" class="head-image" />
        <tiny-col :span="6">
          <div class="col">
            <div>{{ $t('userInfo.description') }}</div>
            <div class="space"></div>
            <div>
              {{ personalStore.description }}
            </div>
          </div>
        </tiny-col>
      </tiny-row>
    </tiny-layout>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import {
  Layout as TinyLayout,
  Row as TinyRow,
  Col as TinyCol,
  UserHead as TinyUserHead
} from '@opentiny/vue';
import { getPersonalBasic } from '@/api/personal';
import { useRoute } from 'vue-router';
import { usePersonalStore } from '@/store';

const personalStore = usePersonalStore();
const route = useRoute()

onMounted(async () => {
  personalStore.personalBasic({userId: route.params.user_id})
})
</script>

<style scoped lang="less">
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
    width: 72px;
    height: 72px;
    font-style: oblique;
    border-radius: 60px;
    fill: var(--ti-common-color-line-active);
  }

  .space {
    height: 10px;
  }

  .head-image {
    margin-top: 6px;
    padding-right: 10px;
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
  @media (max-width: @screen-xs) {
    .user {
      width: 25%;
    }
  }
</style>
