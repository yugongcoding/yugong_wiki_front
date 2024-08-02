<template>
<div class="article-menu" style="color:black">
  <!-- 首页 -->
  <div class="book"  @click="articleInfo.$state.showBookInfo = true;bookCategory()">
    <div class="book-info">
      <HomeOutlined />
      <tiny-tooltip content="首页" visible="auto" placement="right">
        <router-link to="/" class="book-title">首页</router-link>
      </tiny-tooltip>
    </div>
  </div>
  <!-- 当前团队空间下所有的知识库 -->
  <div class="book">
    <div class="book-info">
      <ProfileOutlined />
      <tiny-dropdown :show-icon="false" title="知识库" size="medium" class="book-title"
        >
        <template #dropdown>
          <tiny-dropdown-menu :visible-arrow="true">
            <tiny-dropdown-item v-for="item in books" :label="item.name" :key="item.id" @click="changBook(item)"></tiny-dropdown-item>
          </tiny-dropdown-menu>
        </template>
    </tiny-dropdown>
    </div>
  </div>
  <!-- 当前知识库 -->
  <div class="book"  @click="bookCategory()">
    <div class="book-info">
      <ReadOutlined />
      <tiny-tooltip :content="bookInfo.name" visible="auto" placement="right">
        <div class="book-title">{{ bookInfo.name }}</div>
      </tiny-tooltip>
    <div class="book-info-operation" v-show="loginStatus">
      <div @click.stop style="width: 24px;height: 24px; display: flex; align-items: center">
        <tiny-dropdown title="" :suffix-icon="IconMore()" trigger="hover" :hide-on-click="true">
          <template #dropdown>
            <tiny-dropdown-menu :visible-arrow="true">
              <!-- <tiny-dropdown-item>移动到</tiny-dropdown-item> -->
              <tiny-dropdown-item>设置</tiny-dropdown-item>
              <tiny-dropdown-item>删除</tiny-dropdown-item>
            </tiny-dropdown-menu>
          </template>
        </tiny-dropdown>
      </div>

      <div @click.stop  style="width: 24px;height: 24px; display: flex; align-items: center">
        <tiny-dropdown title="" :suffix-icon="IconPlus()" trigger="hover" :hide-on-click="true">
          <template #dropdown>
            <tiny-dropdown-menu :visible-arrow="true">
              <tiny-dropdown-item @click="clickRoot">添加章节</tiny-dropdown-item>
            </tiny-dropdown-menu>
          </template>
        </tiny-dropdown>
      </div>
    </div>
  </div>
  </div>

  <tiny-tree-menu
    ref="treeMenu"
    node-key="article_id"
    :data="[]"
    :expand-on-click-node="true"
    :default-expanded-keys="expandeArr"
    :default-expanded-keys-highlight="highlight"
    draggable
    @node-click="handleNodeClick"
    @node-drag-end="dragEnd"
    :indent="32"
    lazy
    :load="loadNode"
    :show-title="false"
    >
    <template #default="slotScope">
      <tiny-tooltip :content="slotScope.data.label" visible="auto" placement="right">
        <div class="article-title">{{ slotScope.data.label }}</div>
      </tiny-tooltip>
      <!-- <a class="article-title">
        {{ slotScope.data.label }}
      </a> -->
      <div class="menu-icon-group" v-show="loginStatus">
        <div @click.stop style="width: 24px;height: 24px; display: flex; align-items: center">
          <tiny-dropdown title="" :suffix-icon="IconMore()" trigger="hover" class="menu-icon-right" :hide-on-click="true">
            <template #dropdown>
              <tiny-dropdown-menu :visible-arrow="true">
                <!-- <tiny-dropdown-item>排序</tiny-dropdown-item> -->
                <!-- <tiny-dropdown-item>移动到</tiny-dropdown-item> -->
                <!-- <tiny-dropdown-item>权限设置</tiny-dropdown-item> -->
                <tiny-dropdown-item @click="clickRootSetting(slotScope.node)">设置</tiny-dropdown-item>
                <!-- <tiny-dropdown-item @click="updateChild(slotScope.node)">刷新</tiny-dropdown-item> -->
                <tiny-dropdown-item @click="deleteArticle(slotScope.node)">删除</tiny-dropdown-item>
              </tiny-dropdown-menu>
            </template>
          </tiny-dropdown>
        </div>

        <div @click.stop  style="width: 24px;height: 24px; display: flex; align-items: center">
          <tiny-dropdown title="" :suffix-icon="IconPlus()" trigger="hover" class="menu-icon-right" :hide-on-click="true">
            <template #dropdown>
              <tiny-dropdown-menu :visible-arrow="true">
                <tiny-dropdown-item @click="clickChild(slotScope.node, -1)">上方添加新章节</tiny-dropdown-item>
                <tiny-dropdown-item @click="clickChild(slotScope.node, 0)">添加子章节</tiny-dropdown-item>
                <tiny-dropdown-item @click="clickChild(slotScope.node, 1)">下方添加新章节</tiny-dropdown-item>

              </tiny-dropdown-menu>
            </template>
          </tiny-dropdown>
        </div>
      </div>

    </template>

  </tiny-tree-menu>

  <tiny-dialog-box
    :visible="boxVisibility"
    @update:visible="boxVisibility = $event"
    resize
    title="添加文章"
    :is-form-reset="true"
  >
    <tiny-form :model="formData" label-width="100px" ref="childFormRef" :rules="rules">
      <tiny-form-item label="文章名称" prop="name">
        <tiny-input type="text" v-model.trim="formData.name" ref="childNameFocus" @keydown.enter="addArticle"></tiny-input>
      </tiny-form-item>

      <tiny-form-item label="标签分类" prop="category">
        <tiny-input type="text" v-model.trim="formData.category"  @keydown.enter="addArticle"></tiny-input>
      </tiny-form-item>

      <tiny-form-item label="权限设置" prop="auth">
        <tiny-select v-model="formData.auth" placeholder="权限设置">
          <tiny-option v-for="item in authOptions" :key="item.value" :label="item.label" :value="item.value">
          </tiny-option>
        </tiny-select>
      </tiny-form-item>
    </tiny-form>

    <template #footer>
      <tiny-button type="primary" :loading="btnSubmit.loading" @click="addArticle" >{{
        btnSubmit.text[btnSubmit.loading]
      }}</tiny-button>
      <tiny-button @click="boxVisibility=false">取消</tiny-button>
    </template>
  </tiny-dialog-box>

  <!-- 根节点添加文章 -->
  <tiny-dialog-box
    :visible="boxRootVisibility"
    @update:visible="boxRootVisibility = $event"
    resize
    title="添加文章"
    :is-form-reset="true"
  >
    <tiny-form ref="rootFormRef" :model="rootFormData" label-width="100px" :rules="rules">
      <tiny-form-item label="文章名称" prop="name">
        <tiny-input ref="rootNameFocus"  v-model.trim="rootFormData.name"  @keydown.enter="addRootArticle"></tiny-input>
      </tiny-form-item>

      <tiny-form-item label="标签分类" prop="category">
        <tiny-input type="text" v-model.trim="rootFormData.category"  @keydown.enter="addRootArticle"></tiny-input>
      </tiny-form-item>

      <tiny-form-item label="权限设置" prop="auth">
        <tiny-select v-model="rootFormData.auth" placeholder="权限设置">
          <tiny-option v-for="item in authOptions" :key="item.value" :label="item.label" :value="item.value">
          </tiny-option>
        </tiny-select>
      </tiny-form-item>
    </tiny-form>
    <template #footer>
      <tiny-button type="primary" :loading="btnSubmit.loading" @click="addRootArticle">{{
        btnSubmit.text[btnSubmit.loading]
      }}</tiny-button>
      <tiny-button @click="boxRootVisibility=false">取消</tiny-button>
    </template>
  </tiny-dialog-box>

  <!-- 修改子节点权限等 -->
  <tiny-dialog-box
      :visible="settingVisibility"
      @update:visible="settingVisibility = $event"
      resize
      title="设置"
      :is-form-reset="true"
    >
      <tiny-form ref="settingFormRef" :model="settingFormData" label-width="100px" :rules="rules">
        <tiny-form-item label="文章名称" prop="name">
          <tiny-input ref="childSettingFocus" type="text" v-model.trim="settingFormData.name" @keydown.enter="setting"></tiny-input>
        </tiny-form-item>

        <tiny-form-item label="标签分类" prop="category">
          <tiny-input type="text" v-model.trim="settingFormData.category" @keydown.enter="setting"></tiny-input>
        </tiny-form-item>

        <tiny-form-item label="权限设置" prop="auth">
          <tiny-select v-model="settingFormData.auth" placeholder="权限设置">
            <tiny-option v-for="item in authOptions" :key="item.value" :label="item.label" :value="item.value">
            </tiny-option>
          </tiny-select>
        </tiny-form-item>
      </tiny-form>
      <template #footer>
        <tiny-button type="primary" :loading="btnSubmit.loading" @click="setting">{{
          btnSubmit.text[btnSubmit.loading]
        }}</tiny-button>
        <tiny-button @click="settingVisibility=false">取消</tiny-button>
      </template>
  </tiny-dialog-box>

</div>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeMount, onMounted, nextTick, onBeforeUnmount, defineComponent } from 'vue'
import {
  ReadOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  LikeOutlined,
  TeamOutlined,
  UserOutlined,
  ProfileOutlined
} from '@ant-design/icons-vue'
import { TreeMenu as TinyTreeMenu, Modal, Dropdown as TinyDropdown,
  DropdownMenu as TinyDropdownMenu,
  DropdownItem as TinyDropdownItem,
  Input as TinyInput,
  Button as TinyButton,
  DialogBox as TinyDialogBox,
  Form as TinyForm,
  Select as TinySelect,
  Option as TinyOption,Popconfirm as TinyPopconfirm,
  FormItem as TinyFormItem, Tooltip as TinyTooltip} from '@opentiny/vue'
import { iconApp, iconCustom, iconText, iconTotal ,IconDeltaRight, IconDeltaDown, IconMore, IconPlus, IconFile, IconFiles, IconPublicHome } from '@opentiny/vue-icon'
import { getBookSpace } from '@/api/space'
import {articleMenu, articleContent, addArticleContent, getBookInfo, deleteArticleContent, saveArticleContent, getBookCategory} from '@/api/article'
import { useRoute, useRouter } from 'vue-router';
import { articleStore } from '@/store';
import { set } from '@vueuse/core';
import { cons } from 'fp-ts/lib/ReadonlyNonEmptyArray';



defineComponent({
  components: {
    ReadOutlined,
    HomeOutlined,
    ProfileOutlined
    // UnorderedListOutlined,
    // LikeOutlined,
    // TeamOutlined,
    // UserOutlined
  },
});
const rootNameFocus = ref()
const childNameFocus = ref()
const childSettingFocus = ref()

const clickRootSetting = async (node) => {
  settingVisibility.value=true;
  await nextTick()
  childSettingFocus.value.focus(node)
  currentNode.value = node;
  settingFormData.value = {
    name: node.data.name,
    auth: node.data.auth,
    category: node.data.category
  }
}

const clickRoot = async () => {
  boxRootVisibility.value=true;
  await nextTick()
  rootNameFocus.value.focus()
}

const clickChild = async (node, v) => {
  currentNode.value =node;
  flag.value = v
  boxVisibility.value=true;
  await nextTick()
  childNameFocus.value.focus()
}

const loginStatus = ref(localStorage.loginStatus)
const mouseenter = (data) => {
  // (data)
  data.showMoreIcon = true
}
const authOptions = ref([{
      label: '公开可见',
      value: 0
    },{
      label: '私人可见',
      value: 1
    },{
      label: '空间成员可见',
      value: 2
    }
])


// 表单校验规则
const rules = ref({
  name: [{ required: true, message: '必填', trigger: 'change'},
         { required: true, message: '长度介于1~255', trigger: 'change',  min: 1, max: 255 }],
  auth: [{ required: true, message: '必填', trigger: 'change' }]
})
// 右侧收缩按钮
// const menuShow = ref(false)
// const collapseChange = () => {
//   menuShow.value = !(menuShow.value)
// }

const treeMenu = ref(null)

const TinyIconPublicHome = IconPublicHome()
const TinyIconDeltaRight = IconDeltaRight()
const TinyIconFile = IconFile()
const TinyIconFiles = IconFiles()

const expandeArr = ref([])
const highlight = ref(0)

const expanded = ref(false)

const route = useRoute()
const router = useRouter()

// 获取此团队空间下的所有知识库
const books = ref([])
const getBooks = async () => {
  let res = await getBookSpace({teamId: route.query.teamId})
  books.value = res.data
}
getBooks()

const changBook = (data: any) => {
  const { href } = router.resolve({
                path: `/article`,
                query: {teamId: data.team_id,
                bookId: data.id}
              })
  window.open(href, '_self')
}
const flag = ref(0)
const boxVisibility = ref(false)
const boxRootVisibility = ref(false)
const settingVisibility = ref(false)

const currentKey = ref('')
const currentNode = ref()


const settingFormData = ref({
  category: '',
  name: '',
  auth: 0
})

const formData = ref({
  category: '',
  name: '',
  auth: 0
})
const rootFormData = ref({
  category: '',
  name: '',
  auth: 0
})

const btnSubmit = ref({
  loading: false,
  text: {
    true: '提交中',
    false: '确定'
  }
})
const settingFormRef = ref()
const bookInfo = ref({})


const dragEnd = () => {
}
const setting = async () => {

  btnSubmit.value.loading = true
  settingFormRef.value
  .validate()
  .then(async () => {
      let data = {
        id: currentNode.value.data.id,
        auth: settingFormData.value.auth,
        name: settingFormData.value.name,
        category: settingFormData.value.category
      }
      const response = await saveArticleContent(data)
      articleInfo.setInfo(response.data)
      currentNode.value.data = Object.assign(currentNode.value.data, {
        auth: settingFormData.value.auth,
        name: settingFormData.value.name,
        label: settingFormData.value.name,
        category: settingFormData.value.category

      })
      settingVisibility.value = false
      Modal.message({
            message: response.errMsg,
            status: 'success',
          });
  })
  .catch(() => {
    Modal.message({
            message: '表单数据校验失败，请检查您的输入是否正确',
            status: 'error',
          });
  }).finally(() => {
    btnSubmit.value.loading = false
  })
}
const deleteArticle = async (node) => {
  Modal.confirm('您确定要删除吗？').then(async (confirmFlag) => {
    if (confirmFlag === 'confirm') {
      let Params = {
      data: {	// 请求参数放在请求体
        articleId: node.data.article_id,
        id: node.data.id
      }
    }
    const response = await deleteArticleContent(Params)
    let nextNodeId = null
    if (node.data.id === articleInfo.id) {
      if (!(node.parent.parent)) {
        if (node.parent.childNodes.length === 1) {
          bookCategory()
        } else {
          let index = node.parent.childNodes.indexOf(node)
          if (index === node.parent.childNodes.length - 1) {
            handleNodeClick(node.parent.childNodes[index - 1].data)
            nextNodeId = node.parent.childNodes[index - 1].data.article_id
          } else {
            handleNodeClick(node.parent.childNodes[index + 1].data)
            nextNodeId = node.parent.childNodes[index + 1].data.article_id
          }
        }
      } else if (node.parent.childNodes.length === 1) {
          handleNodeClick(node.parent.data)
          nextNodeId = node.parent.data.article_id
        } else {
          let index = node.parent.childNodes.indexOf(node)
          if (index === node.parent.childNodes.length - 1) {
            handleNodeClick(node.parent.childNodes[index - 1].data)
            nextNodeId = node.parent.childNodes[index - 1].data.article_id
          } else {
            handleNodeClick(node.parent.childNodes[index + 1].data)
            nextNodeId = node.parent.childNodes[index + 1].data.article_id
          }
        }
    }
    node.parent.removeChild(node)
      Modal.message({
            message: response.errMsg,
            status: 'success',
          });
    }

    })
}
const articleInfo = articleStore();

const bookCategory = async () => {
  articleInfo.showBookInfo = true
  let Params = {bookId: route.query.bookId}
  let res = await getBookCategory(Params)
  articleInfo.bookCategory = res.data
}

const getBookInfoData = async () => {
  let Params = {bookId: route.query.bookId}
  let res = await getBookInfo(Params)
  let tmpBookInfo = res.data[0]
  articleInfo.$state.bookInfo = tmpBookInfo
  return res.data[0]
}

const handleNodeClick = async (data) => {
  if (!(articleInfo.show)) {
    await articleInfo.saveArticle('自动保存成功')
    getArticle(data)
  } else {
    getArticle(data)
  }
  // 编辑状态
  // if (!(articleInfo.show)) {
  //   Modal.confirm('您有文章尚未保存，是否立即保存？').then((confirmFlag) => {
  //     if (confirmFlag === 'confirm') {
  //       articleInfo.saveArticle()
  //     }
  //     getArticle(data)
  //   }
  //   )
  // } else {
  //   getArticle(data)
  // }
}

const getArticle = async (data) => {
    articleInfo.showBookInfo = false
    router.push({query: {...route.query, articleId:data.article_id, id: data.id}})
    let params = {articleId: data.article_id, id: data.id }
    // 获取文章信息并缓存在store
    let res = await articleContent(params)
    articleInfo.setInfo(res.data)
    // 获取统计信息并缓存在store
    articleInfo.statistic(data.id)
    articleInfo.show = true
}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(async () => {
})
getBookInfoData().then((res) => {
  bookInfo.value = res
})
bookCategory()
onMounted(async () => {
  if (route.query.articleId) {
    articleInfo.showBookInfo = false
    getArticle({article_id: route.query.articleId, id: route.query.id})
  }
  await nextTick()
  expandeArr.value = [route.query.articleId]
  highlight.value = route.query.articleId
})
const isRoot = ref(false)

let rootNode
let rootResolve
let childResolve

// 刷新节点的子节点
const updateChild = (node) => {
  loadNode(node, childResolve)
  node.childNodes = []
}

const loadNode = async (node, resolve) => {
  if (node.level === 0 && !rootResolve && !rootNode) {
    rootNode = node
    rootResolve = resolve
    getArticleMenu().then((res) => {
      rootResolve(res)
    })
  } else if (!childResolve){
    childResolve = resolve
  }
  let params = {articleId: node.data.article_id}
  let childData = await getArticleMenu(params)
  return resolve(childData)
}


const displayMore = () => {
}

const childFormRef = ref()
const rootFormRef = ref()
const setCurrentKey = (key) =>  {
  treeMenu.value.setCurrentKey(key)
}
// 根节点下添加文章
const addRootArticle = () => {
  btnSubmit.value.loading = true
  rootFormRef.value
  .validate()
  .then(async () => {
      let params = {articleId: bookInfo.value.id, name: rootFormData.value.name, category: rootFormData.value.category,
      flag: 0, isRoot: true, auth: rootFormData.value.auth, bookId: route.query.bookId, teamId: route.query.teamId}
      const response = await addArticleContent(params)
      rootResolve(response.data)
      boxRootVisibility.value = false
        Modal.message({
            message: response.errMsg,
            status: 'success',
          });
  })
  .catch((e) => {
    Modal.message({
      message: '表单数据校验失败，请检查您的输入是否正确',
            status: 'error',
          });
  }).finally(() => {
    btnSubmit.value.loading = false
  })
}

// const addRootArticle = () => {
//   // root: 是否在根节点插入数据
//   boxRootVisibility.value = true
//   btnSubmit.value.loading = true
//   let params = {articleId: bookInfo.value.id, name: rootFormData.value.name, flag: 0, isRoot: true}
//   addArticleContent(params).then((res) => {
//       boxRootVisibility.value = false
//       btnSubmit.value.loading = false
//       rootResolve(res.data)
//   })
// }
const addArticle = () => {
  btnSubmit.value.loading = true
  childFormRef.value
  .validate()
  .then(async () => {
      let params
      if (flag.value === 0) {
        params = {category: formData.value.category,articleId: currentNode.value.data.article_id, name: formData.value.name, flag: flag.value, isRoot: false, auth: formData.value.auth, bookId: route.query.bookId, teamId: route.query.teamId}
      } else if (flag.value === -1 || flag.value === 1) {

        if (!(currentNode.value.parent.parent)) {
          params = {category: formData.value.category,articleId: currentNode.value.data.article_id, fatherId: bookInfo.value.id, name: formData.value.name, flag: flag.value, isRoot: false, auth: formData.value.auth, bookId: route.query.bookId, teamId: route.query.teamId}
        } else {
        params = {category: formData.value.category,articleId: currentNode.value.data.article_id, fatherId: currentNode.value.parent.data.article_id, name: formData.value.name, flag: flag.value, isRoot: false, auth: formData.value.auth, bookId: route.query.bookId, teamId: route.query.teamId}
        }
      }
      const response = await addArticleContent(params)
      boxVisibility.value = false
      // 插入到子节点第一位
      if (flag.value === 0) {
        let index = 0
        currentNode.value.insertChild({'data': response.data[0]}, index, true)
      }
      // 上方插入
      if (flag.value === -1) {

        let index = currentNode.value.parent.childNodes.indexOf(currentNode.value)
        currentNode.value.parent.insertChild({'data': response.data[0]}, index, true)
      }
      // 下方插入
      if (flag.value === 1) {

        let index = currentNode.value.parent.childNodes.indexOf(currentNode.value)

        currentNode.value.parent.insertChild({'data': response.data[0]}, index + 1, true)
      }
    Modal.message({
        message: response.errMsg,
            status: 'success',
          });
  })
  .catch(() => {
    Modal.message({
      message: '表单数据校验失败，请检查您的输入是否正确',
            status: 'error',
          });
  }).finally(() => {
    btnSubmit.value.loading = false
  })
}


const getArticleMenu = async (menuParams) => {
  if (!menuParams) {
    menuParams = {articleId: route.query.articleId, bookId: route.query.bookId, id: route.query.id}
  }
  const res = await articleMenu(menuParams)
  return res.data
}

const icons = ref({
  home: iconApp(),
  guide: iconCustom(),
  book: iconText(),
  component: iconTotal()
})
</script>

<style scoped lang="less">
.router-link-active {
    text-decoration: none;//去除默认样式
    color: orange;//高亮的颜色
  }
.book-info  a{
  text-decoration: none;
  color: black;
}
.article-menu:deep(.tiny-dropdown__title) {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size:16px;
  color: black;
}
.book-info .book-title {
  width: calc(100% - 80px);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding-left: 15px;
}
.article-title {
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.book.is-collapsed {
  width: 0;
  display: none;
  transition: width .5s;
  overflow: hidden;
}

.book {
  transition: height .5s;
  transition: width .5s;
  padding-top: 8px;
  // border-right: 1px solid #dfe1e6;
  padding-bottom: 2px;
  cursor: pointer;
}
.book-info-operation {
  align-items: center;
  display: flex;
  position: absolute;
  right: 5px
}
.book-info:deep(.tiny-svg) {
  width: 16px;
  height: 16px;
}
.book-info {
  padding-left: 24px;
  position: relative;
  color: #000;
  display: flex;
  height: 40px;
  width: 100%;
  align-items: center;
}
.book-info:hover {
  background-color: #eff0f0;
  border-radius: 6px;
}
.article-menu {
  padding-left: 8px;
}
.article-menu:deep(.tiny-tree-node__content-box) {
  // overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
  max-width: calc(100% - 80px);
}
// 去除默认右边竖线
.article-menu:deep(.tiny-tree-menu::before) {
  border-right: none;
}
.article-menu:deep(.tiny-tree-menu .tiny-input .tiny-input__inner) {
  height: 40px;
  border-top: 1px solid var(--ti-tree-menu-border-color);
}
// .article-menu:deep(.tiny-tree-menu) {
//   height: calc(100vh - 120px - 50px);
// }



// 增加子菜单上下间距
// .article-menu:deep(.tiny-tree-menu .tiny-tree > div) {
//   margin: 3px 0;
// }



// 解决切换闪动
.article-menu:deep(.tiny-tree-menu .tiny-tree .tree-node-name) {
  border-left: 2px solid transparent !important;
}
.article-menu:deep(.tiny-tree) {
  height: calc(100vh - 60px - 40px - 50px - 50px - 50px);
  overflow: auto;
}
.article-menu:deep(.tiny-tree-menu .tiny-tree .tiny-tree-node .tiny-tree-node__content .tree-node-icon) {
  order: 0;
  width: 24px;
  height: 24px;
  display:flex;
  align-items:center;
  justify-content:center;
}
.article-menu:deep(.tiny-tree-menu .tiny-tree .tiny-tree-node .tiny-tree-node__content:hover) {
    background-color: #eff0f0;
    border-radius: 6px;
}
.article-menu:deep(.tiny-tree-menu .tiny-tree .tiny-tree-node .tiny-tree-node__content) {
    border-radius: 6px;
    margin-top: 1.5px;
    margin-bottom: 1.5px;
}
.article-menu:deep(.tiny-tree-menu .tiny-tree .tiny-tree-node.is-current>.tiny-tree-node__content) {
  background-color: #eff0f0;
}
.article-menu:deep(.tiny-tree-node.is-current:not(.show-checkbox)>.tiny-tree-node__content .tiny-tree-node__content-box) {
  background-color: #eff0f0;
}
.article-menu:deep(.tiny-tree-menu .tiny-tree .tiny-tree-node.is-current>.tiny-tree-node__content .tree-node-body) {
  color: #262626;
  font-weight: 700;
}
.article-menu:deep(.tiny-tree-menu .tiny-tree .tiny-tree-node.is-current>.tiny-tree-node__content .tree-node-body) {
  color: #262626;
}
.article-menu:deep(.tiny-tree-menu .tiny-tree .tiny-tree-node .tiny-tree-node__content .tree-node-icon:hover) {
  background-color: #d8dad9;
  border-radius: 6px;
}
.article-menu:deep(.tiny-dropdown .tiny-dropdown__trigger:not(.tiny-button):not(:has(.tiny-dropdown__title))>.tiny-dropdown__suffix-inner:hover) {
  background-color: #d8dad9;
  border-radius: 6px;
}
.article-menu:deep(.tiny-dropdown .tiny-dropdown__trigger:not(.tiny-button):not(:has(.tiny-dropdown__title))>.tiny-dropdown__suffix-inner) {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.article-menu:deep(.tiny-dropdown .tiny-dropdown__trigger:not(.tiny-button):not(:has(.tiny-dropdown__title))>.tiny-dropdown__suffix-inner svg) {
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
.menu-icon-right {
  display: none;
}

.article-menu:deep(.tiny-tree-menu .tiny-tree .tiny-tree-node .tiny-tree-node__content:hover .menu-icon-right) {
  display: inline;
}
.article-menu:deep(.tiny-tree-menu) {
  width: 100%;
}

.menu-icon-group {
  // width: 100%;
  // height: 100%;
  align-items: center;
  display: flex;
  position: absolute;
  right: 5px
}
.custom-icon svg {
  width: 1em;
  height: 1em;
  margin-left: 0px;
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
