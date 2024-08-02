import { defineStore } from 'pinia';
import {
  getArticleStatistic,
  updateArticleStatistic,
  saveArticleContent
} from '@/api/article';
// import { setToken, clearToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { shallowRef } from 'vue';
import { MobileState } from './types';

const mobileStore = defineStore('mobile', {
  state: (): MobileState => ({
    is_pc: true,
    // 文章页面树形菜单超宽提示位置
    showAnchor: false,
    hideAfter: 0,
    articleMenuNodeTooltipPlacement: 'right',
    // 管理页面
    asideWidth: 200,
    showManageCollapse: true,
    // 评论抽屉弹出位置，默认右侧
    placement: "right",
    // 控制菜单弹出
    showCollapse: true,
    // 分割面板
    splitInit: '300px'
  }),
  getters: {
  },
  actions: {
    setInfo(data: any) {
      if (window.innerWidth <= 768) {
        this.$patch(data)
      }
    },
    CollapseManageMenu() {
      this.showManageCollapse = !(this.showManageCollapse)
      this.asideWidth = window.innerWidth
    },
    ExpandManageMenu(){
      this.showManageCollapse = !(this.showManageCollapse)
      this.asideWidth = 0
    },

    CollapseMenu(){
      this.showCollapse = !(this.showCollapse)
      this.splitInit = window.innerWidth.toString().concat('px')
    },
    ExpandMenu(){
      this.showCollapse = !(this.showCollapse)
      this.splitInit = '0px'
    }
  }
});

export default mobileStore;
