<template>
  <div id="contain">
    <tiny-tabs v-model="activeName">
      <tiny-tab-item :title="$t('userInfo.tab.book')" name="book">
        <infocard></infocard>
        <tiny-divider content-color="#7693f5">知识库</tiny-divider>
        <div class="space-data">
        <tiny-card
        style="margin: 5px; cursor: pointer"
        v-for="item in personalStore.data"
        :key="item.id"
        @click="clickTeam(item)"
        :title="item.name"
        size="small"
        height="50px"
        card-class="my-card">
        <template #title-right>
          <tiny-tag type="success" size="mini" effect="light" v-show="item.category">{{item.category}}</tiny-tag>
        </template>
          <p>
            {{item.description}}
          </p>
      </tiny-card>
      </div>
      </tiny-tab-item>
    </tiny-tabs>
  </div>
  <div class="contentFilter">
  </div>
</template>

<script lang="ts" setup>
import { Card as TinyCard, CardGroup as TinyCardGroup, Button as TinyButton, Modal, Tag as TinyTag, Divider as TinyDivider} from '@opentiny/vue'
import { ref, reactive, onMounted, watch } from 'vue';
import {
  Tabs as TinyTabs,
  TabItem as TinyTabItem,
  Loading,
} from '@opentiny/vue';
import { IconChevronDown } from '@opentiny/vue-icon';
import router from '@/router'
import {
  Layout as TinyLayout,
  Row as TinyRow,
  Col as TinyCol,
  UserHead as TinyUserHead
} from '@opentiny/vue';
import { getPersonalData } from '@/api/personal';
import { useRoute } from 'vue-router';
import { usePersonalStore } from '@/store';
import { getUserData } from '@/api/user';
import infofilter from './info-filter.vue';
import infocard from './info-card.vue';
import infotable from './info-table.vue';
import infochart from './info-chart.vue';
import infoTasksTip from './info-tasksTip.vue';

const route = useRoute()
function clickTeam(data: any) {
  if (activeName.value === 'book') {
    router.push({ path: '/article', query: { teamId: data.team_id, bookId: data.id } })
  }
  if (activeName.value === 'article') {
    router.push({ path: '/article', query: { teamId: data.team_id, bookId: data.book_id, articleId: data.article_id } })
  }
}
// 加载效果
const state = reactive<{
  loading: any;
}>({
  loading: null
});

// 变量设置
const personalStore = usePersonalStore();
const ChevronDown = IconChevronDown();
const activeName = ref('book');
const Filter = ref(false);
const Sort = ref(false);

// 请求数据接口方法
const fetchData = async () => {
  state.loading = Loading.service({
    text: 'loading...',
    target: document.getElementById('contain'),
    background: 'rgba(0, 0, 0, 0.4)',
  });
  try {
    personalStore.personalData({userId: route.params.user_id, flag: activeName.value})
  } finally {
    state.loading.close();
  }
};

// 初始化请求数据
onMounted(() => {
  fetchData();
});

watch(activeName, () => {
  fetchData()
});
</script>

<style scoped lang="less">
  .space-data {
    display: flex;
    flex-wrap: wrap;
  }
  #contain {
    height: 100%;
    padding: 15px;
    overflow: hidden;
  }

  .contentFilter {
    position: absolute;
    top: 10px;
    right: 24px;
    z-index: 99;
    display: flex;
    height: 30px;
    cursor: pointer;
  }

  .filter {
    z-index: 99;
  }

  .contentFilter {
    .left {
      width: 122px;
      height: 34px;
      font-size: 14px;
      line-height: 32px;
      text-align: center;
      background: #eff1f7;
      border-radius: 17px;
    }

    .right {
      width: 60px;
      height: 34px;
      margin: 0 15px;
      line-height: 34px;
      text-align: center;
      background: #eff1f7;
      border-radius: 17px;
    }

    img {
      width: 14px;
      height: 14px;
    }
  }

  .sort {
    position: absolute;
    top: 44px;
    right: 100px;
    z-index: 99;
    width: 150px;
    margin-top: 10px;
    margin-left: -7px;
    color: #606266;
    background: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

    li {
      position: relative;
      padding: 0 12px;
      color: #333;
      font-size: 14px;
      line-height: 36px;
      text-align: center;
      list-style-type: none;
      background-color: #fff;
      border-radius: 6px;
      cursor: pointer;
    }

    li:hover {
      color: #2f5bea;
      background-color: #f5f6f7;
    }
  }

  .filter {
    position: absolute;
    top: 55px;
    right: 1%;
    z-index: 99;
    width: 522px;
    padding: 30px;
    color: #606266;
    background: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    box-shadow: 0 0 2px 2px var(--ti-common-color-bg-normal);

    div {
      padding-top: 3px;
    }
  }
</style>
