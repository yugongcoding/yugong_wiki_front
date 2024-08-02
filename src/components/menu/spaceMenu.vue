<template>
  <div class="manage-menu">
    <tiny-tree-menu
    node-key="id"
    :data="treeData"
    :show-filter="false"
    only-check-children
    :default-expanded-keys="expandeArr"
    :default-expanded-keys-highlight="highlight"
    @node-click="handleNodeClick"

    ></tiny-tree-menu>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { TreeMenu as TinyTreeMenu } from '@opentiny/vue'
import { useMobileStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const expandeArr = ref([])
const highlight = ref()
const mobileStore = useMobileStore();

const treeData = ref([
  {
    id: 1,
    label: '首页',
    path: '/'
  },
  // {
  //   id: 10,
  //   label: '数据看板',
  //   children: [
  //       {
  //         id: 11,
  //         label: '数据监控',
  //         path: '/board/home'
  //       },
  //       {
  //         id: 12,
  //         label: '工作台',
  //         path: '/board/work'
  //       }
  //   ]
  // },
  {
    id: 20,
    label: '空间管理',
    children: [
        {
          id: 21,
          label: '团队空间',
          path: '/space/team'
        },
        {
          id: 22,
          label: '知识库',
          path: '/space/book'
        }
    ]
  },
  {
    id: 40,
    label: '个人中心',
    children: [
        {
          id: 41,
          label: '用户中心',
          path: '/user/info'
        },
        {
          id: 42,
          label: '用户设置',
          path: '/user/setting'
        }
    ]
  },
  {
    id: 60,
    label: '公告',
    children: [
        {
          id: 61,
          label: '开发日志',
          path: '/develop/log'
        }
    ]
  },
])

const routePathMap = {}
const getRouteMap = (data)  => {
  data.forEach((item) => {
    if (item.path) {
      routePathMap[item.path] = item.id
    }
    if (item.children) {
      getRouteMap(item.children)
    }
  })
}
getRouteMap(treeData.value)
/**
 * 监听路由变化高亮当前菜单
 */
watch(
  () => router.currentRoute.value.path,
  (newValue) => {
    expandeArr.value = [routePathMap[newValue]]
    highlight.value = routePathMap[newValue]
  },
  { immediate: true }
);

const handleNodeClick = (data) => {
  mobileStore.setInfo({asideWidth: 0, showManageCollapse: true})
  router.push({path: data.path})
}
</script>
<style scoped lang="less">
.manage-menu {
  padding-left: 8px;
}
.manage-menu:deep(.tiny-tree-menu .tiny-input .tiny-input__inner) {
  height: 40px;
  border-top: 1px solid var(--ti-tree-menu-border-color);
}
// 增加子菜单上下间距
.manage-menu:deep(.tiny-tree-menu .tiny-tree > div) {
  margin: 3px 0;
}
// 解决切换闪动
.manage-menu:deep(.tiny-tree-menu .tiny-tree .tree-node-name) {
  border-left: 2px solid transparent !important;
}
// 去除默认右边竖线
.manage-menu:deep(.tiny-tree-menu::before) {
  border-right: none;
}
.manage-menu:deep(.tiny-tree) {
  height: calc(100vh - 120px - 28px);
  overflow: auto;
}
.manage-menu:deep(.tiny-tree-menu .tiny-tree .tiny-tree-node .tiny-tree-node__content .tree-node-icon) {
  order: 0;
  width: 24px;
  height: 24px;
  display:flex;
  align-items:center;
  justify-content:center;
}
.manage-menu:deep(.tiny-tree-menu .tiny-tree .tiny-tree-node .tiny-tree-node__content:hover) {
    background-color: #eff0f0;
    border-radius: 6px;
}
.manage-menu:deep(.tiny-tree-menu .tiny-tree .tiny-tree-node .tiny-tree-node__content) {
    border-radius: 6px;
    margin-top: 1.5px;
    margin-bottom: 1.5px;
}
.manage-menu:deep(.tiny-tree-menu .tiny-tree .tiny-tree-node.is-current>.tiny-tree-node__content) {
  background-color: #eff0f0;
}
.manage-menu:deep(.tiny-tree-node.is-current:not(.show-checkbox)>.tiny-tree-node__content .tiny-tree-node__content-box) {
  background-color: #eff0f0;
}
.manage-menu:deep(.tiny-tree-menu .tiny-tree .tiny-tree-node.is-current>.tiny-tree-node__content .tree-node-body) {
  color: #262626;
  font-weight: 700;
}
.manage-menu:deep(.tiny-tree-menu .tiny-tree .tiny-tree-node.is-current>.tiny-tree-node__content .tree-node-body) {
  color: #262626;
}

// .manage-menu:deep(.tiny-tree-menu .tiny-tree .tiny-tree-node .tiny-tree-node__content .tree-node-icon:hover) {
//   background-color: #d8dad9;
//   border-radius: 6px;
// }


.manage-menu:deep(.tiny-dropdown .tiny-dropdown__trigger:not(.tiny-button):not(:has(.tiny-dropdown__title))>.tiny-dropdown__suffix-inner:hover) {
  background-color: #d8dad9;
  border-radius: 6px;
}
.manage-menu:deep(.tiny-dropdown .tiny-dropdown__trigger:not(.tiny-button):not(:has(.tiny-dropdown__title))>.tiny-dropdown__suffix-inner) {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.manage-menu:deep(.tiny-dropdown .tiny-dropdown__trigger:not(.tiny-button):not(:has(.tiny-dropdown__title))>.tiny-dropdown__suffix-inner svg) {
  width: 14px;
  height: 14px;
  margin: 0;
}
.nodeExpanded {
  transform: rotate(90deg);
  transition: transform .3s;
}
.nodeShrinked {
  transition: transform .3s;
}

.main-title {
  height: 20px;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  color: #000;
}

.title {
  height: 20px;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
}
.menu-title {
  display: flex;
  gap: 10px;
  align-items: center;
  height: 20px;

  > svg {
    width: 1.3em;
    height: 1.3em;
  }
}
:deep(.tiny-dropdown__suffix-inner svg) {
  vertical-align: middle !important;
}
</style>
