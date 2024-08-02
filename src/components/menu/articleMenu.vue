<template>
<div class="article-menu" style="color:black">
  <!-- 首页 -->
  <div class="book"  @click="goHome">
    <div class="book-info">
      <HomeOutlined />
      <tiny-tooltip content="主页" visible="auto" placement="right">
        <div class="book-title">首页</div>
      </tiny-tooltip>
    </div>
  </div>
  <!-- 当前团队空间下所有的知识库 -->
  <div class="book" @click="getBooks">
    <div class="book-info">
      <ProfileOutlined />
      <tiny-tooltip content="知识库" visible="auto" placement="right">
        <div class="book-title">知识库</div>
      </tiny-tooltip>
    </div>
  </div>
  <!-- 当前知识库 -->
  <div class="book"  @click="bookCategory()">
    <div class="book-info">
      <ReadOutlined />
      <tiny-tooltip :content="bookInfo.name" visible="auto" placement="right">
        <div class="book-title">{{ bookInfo.name }}</div>
      </tiny-tooltip>
    <div class="book-info-operation" v-show="bookInfo.role !== 'reader' && bookInfo.role">
      <div @click.stop style="width: 24px;height: 24px; display: flex; align-items: center">
        <tiny-dropdown title="" :suffix-icon="IconMore()" trigger="hover" :hide-on-click="true">
          <template #dropdown>
            <tiny-dropdown-menu :visible-arrow="true">
              <tiny-dropdown-item v-show="bookInfo.role !== 'reader'"><TinyIconSetting />设置</tiny-dropdown-item>
              <tiny-dropdown-item @click="shareBook"><TinyIconShareArrow />分享</tiny-dropdown-item>
              <tiny-dropdown-item v-show="bookInfo.role === 'admin'"><TinyIconDel />删除</tiny-dropdown-item>
            </tiny-dropdown-menu>
          </template>
        </tiny-dropdown>
      </div>

      <div @click.stop  style="width: 24px;height: 24px; display: flex; align-items: center">
        <tiny-dropdown title="" :suffix-icon="IconPlus()" trigger="hover" :hide-on-click="true">
          <template #dropdown>
            <tiny-dropdown-menu :visible-arrow="true">
              <tiny-dropdown-item @click="clickRoot('start')" v-show="bookInfo.role !== 'reader'"><beforeAdd style="margin-right: 4px"/>开头添加章节</tiny-dropdown-item>
              <tiny-dropdown-item @click="clickRoot('end')" v-show="bookInfo.role !== 'reader'"><afterAdd  style="margin-right: 4px"/>结尾添加章节</tiny-dropdown-item>
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
    :data="treeData"
    :expand-on-click-node="false"
    :default-expanded-keys="expandeArr"
    :default-expanded-keys-highlight="highlight"
    draggable
    @node-drag-end="dragEnd"
    @node-expand="nodeExpand"
    @node-collapse="nodeCollapse"
    :indent="32"
    :show-title="false"
    >
    <template #default="slotScope">
      <div class="expand-icon" v-show="!(slotScope.node.isLeaf)" @click.stop="expandNode(slotScope.data, slotScope.node)">
        <TinyIconChevronRight style="margin: 0px"
        :class="{nodeShrinked: !(slotScope.node.expanded), nodeExpanded: slotScope.node.expanded}"
        />
      </div>

  <!-- :visible="mobileStore.showCollapse?false:'auto'" -->
      <tiny-tooltip
        :content="slotScope.data.label"
        :hide-after="mobileStore.hideAfter"
        :disabled="mobileStore.articleMenuNodeTooltipPlacement==='top'?true:mobileStore.showCollapse"
        :visible="mobileStore.showCollapse?false:'auto'"
        :placement="mobileStore.articleMenuNodeTooltipPlacement"
        @dblclick="expandNode(slotScope.data, slotScope.node)"
        @click="handleNodeClick(slotScope.data)"
        >
        <div class="article-title">{{ slotScope.data.label }}</div>
      </tiny-tooltip>

      <div class="menu-icon-group" v-show="slotScope.data.role !== 'reader'">
        <div @click.stop style="width: 24px;height: 24px; display: flex; align-items: center">
          <tiny-dropdown title="" :suffix-icon="IconMore()" trigger="hover" class="menu-icon-right" :hide-on-click="true">
            <template #dropdown>
              <tiny-dropdown-menu :visible-arrow="true">
                <!-- <tiny-dropdown-item>排序</tiny-dropdown-item> -->
                <!-- <tiny-dropdown-item>移动到</tiny-dropdown-item> -->
                <!-- <tiny-dropdown-item>可见范围</tiny-dropdown-item> -->
                <tiny-dropdown-item @click="clickRootSetting(slotScope.node)" v-show="slotScope.data.role !== 'reader'"><TinyIconSetting />设置</tiny-dropdown-item>
                <tiny-dropdown-item @click="share(slotScope.data)"><TinyIconShareArrow />分享</tiny-dropdown-item>
                <tiny-dropdown-item @click="deleteArticle(slotScope.node)" v-show="slotScope.data.role === 'admin'"><TinyIconDel />删除</tiny-dropdown-item>
              </tiny-dropdown-menu>
            </template>
          </tiny-dropdown>
        </div>

        <div @click.stop  style="width: 24px;height: 24px; display: flex; align-items: center">
          <tiny-dropdown title="" :suffix-icon="IconPlus()" trigger="hover" class="menu-icon-right" :hide-on-click="true">
            <template #dropdown>
              <tiny-dropdown-menu :visible-arrow="true">
                <tiny-dropdown-item @click="clickChild(slotScope.node, -1, slotScope.data)" v-show="slotScope.data.role !== 'reader'"><beforeAdd style="margin-right: 4px"/>上方添加章节</tiny-dropdown-item>
                <tiny-dropdown-item @click="clickChild(slotScope.node, 0, slotScope.data, 'start')" v-show="slotScope.data.role !== 'reader'"><beforeAdd style="margin-right: 4px"/>开头添加子章节</tiny-dropdown-item>
                <tiny-dropdown-item @click="clickChild(slotScope.node, 0, slotScope.data, 'end')" v-show="slotScope.data.role !== 'reader'"><afterAdd style="margin-right: 4px"/>结尾添加子章节</tiny-dropdown-item>
                <tiny-dropdown-item @click="clickChild(slotScope.node, 1, slotScope.data)" v-show="slotScope.data.role !== 'reader'"><afterAdd style="margin-right: 4px"/>下方添加章节</tiny-dropdown-item>
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

      <tiny-form-item label="可见范围" prop="auth">
        <tiny-select v-model="formData.auth" placeholder="可见范围">
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

      <tiny-form-item label="可见范围" prop="auth">
        <tiny-select v-model="rootFormData.auth" placeholder="可见范围">
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

        <tiny-form-item label="可见范围" prop="auth">
          <tiny-select v-model="settingFormData.auth" placeholder="可见范围">
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

  <!-- 查看此团队下的知识库 -->
  <tiny-dialog-box
    :visible="booksVisibility"
    @update:visible="booksVisibility = $event"
    resize
    width="1268"
    title="知识库"
    :is-form-reset="true"
  >
  <div class="card-group">
    <tiny-card
      v-for="item in books"
      :key="item.id"
      @click="changBook(item)"
      :title="item.name"
      size="small"
      height="50px"
      card-class="my-card"
      >
      <template #title-right>
        <tiny-tag type="success" size="mini" effect="light" v-show="item.category">{{item.category}}</tiny-tag>
      </template>

      <tiny-tooltip :content="item.description" visible="auto">
        <p>{{item.description}}</p>
      </tiny-tooltip>
      </tiny-card>
  </div>

    <template #footer>
      <tiny-button @click="booksVisibility=false">关闭</tiny-button>
    </template>
  </tiny-dialog-box>

</div>
</template>

<script setup lang="ts">
import beforeAdd from '@/components/svg/before-add.vue'
import afterAdd from '@/components/svg/after-add.vue'

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
  FormItem as TinyFormItem, Tooltip as TinyTooltip,
Tag as TinyTag,
  Card as TinyCard, CardGroup as TinyCardGroup} from '@opentiny/vue'
import { iconApp, iconCustom, iconText, iconTotal ,IconDeltaRight, IconDeltaDown, IconChevronRight,
IconMore, IconPlus, IconFile, IconFiles, IconPublicHome, IconSetting, IconDel, IconShareArrow, IconShare } from '@opentiny/vue-icon'
import { getBookSpace, getAuthOptions } from '@/api/space'
import { copyText } from '@/utils/copy'
import {articleMenu, articleContent, addArticleContent, getBookInfo, deleteArticleContent, saveArticleContent, getBookCategory, articleMenuInit} from '@/api/article'
import { useRoute, useRouter } from 'vue-router';
import { articleStore, useMobileStore } from '@/store';
import { set } from '@vueuse/core';
import { cons } from 'fp-ts/lib/ReadonlyNonEmptyArray';


const mobileStore = useMobileStore()

const goHome = () => [
  router.push({path: '/'})
]

const expandNode = (data: any, node: any) => {
  clearTimeout(clickTimer.value);
  if (node.expanded) {
    node.collapse()
  } else {
    node.expand(()=> {
      nodeExpand(data, node)
    }, node.parent)
  }
}
const shareBook = () => {
  let url = window.location.origin.concat(`/article?teamId=${bookInfo.value.team_id}&bookId=${bookInfo.value.id}`)
  copyText(url)
  Modal.message({
      message: '分享链接已复制到粘贴板',
            status: 'success',
          });
}

const share = (data: any) => {
  let url = window.location.origin.concat(`/article?teamId=${data.team_id}&bookId=${data.book_id}&articleId=${data.article_id}&id=${data.id}`)
  copyText(url)

  Modal.message({
    message: '分享链接已复制到粘贴板',
    status: 'success',
  });
}
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

const booksVisibility = ref(false)
const rootNameFocus = ref()
const childNameFocus = ref()
const childSettingFocus = ref()
const treeData = ref([])
const clickRootSetting = async (node) => {
  settingVisibility.value=true;
  if (node.level === 1) {
    await patchAuthOptions(bookInfo.value.id, 'book')
  } else {
    await patchAuthOptions(node.parent.data.id, 'article')
  }
  await nextTick()
  childSettingFocus.value.focus(node)
  currentNode.value = node;
  settingFormData.value = {
    name: node.data.name,
    auth: node.data.auth,
    category: node.data.category
  }
}

const patchAuthOptions = async (ids: any, resourceTypes: any) => {
  let params = {id: ids, resourceType: resourceTypes}
  let res = await getAuthOptions(params)
  authOptions.value = res.data
}
// 开头或结尾添加章节 start/end
const addRootPosition = ref('end')
const clickRoot = async (position: string) => {
  addRootPosition.value = position
  boxRootVisibility.value=true;
  await patchAuthOptions(bookInfo.value.id, 'book')
  await nextTick()
  rootNameFocus.value.focus()
}
const addChildPosition = ref('start')
const clickChild = async (node: any, v: number, d: any, position=null) => {
  addChildPosition.value = position
  currentData.value = d
  currentNode.value =node;
  flag.value = v
  boxVisibility.value=true;
  if (node.level === 1 && position === null) {
    await patchAuthOptions(bookInfo.value.id, 'book')
  } else {
    await patchAuthOptions(d.id, 'article')
  }
  await nextTick()
  childNameFocus.value.focus()
}
const mouseenter = (data) => {
  data.showMoreIcon = true
}
const authOptions = ref()


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

const TinyIconShareArrow = IconShareArrow()
const TinyIconShare = IconShare()
const TinyIconDel = IconDel()
const TinyIconSetting = IconSetting()
const TinyIconChevronRight = IconChevronRight()
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
  booksVisibility.value = true
  let res = await getBookSpace({teamId: route.query.teamId})
  books.value = res.data
}

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
const currentData = ref()


const settingFormData = ref({
  category: '',
  name: '',
  auth: ''
})

const formData = ref({
  category: '',
  name: '',
  auth: ''
})
const rootFormData = ref({
  category: '',
  name: '',
  auth: ''
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
  .validate(async (valid: any) => {
    try {
      if (valid) {
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
        status: 'success',
        message: response.errMsg
      })
    } else {
      Modal.message({
      status: 'error',
      message: '表单数据校验失败，请检查您的输入是否正确',
    })
    }
    } finally{
    btnSubmit.value.loading = false
  }
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
    // 删除的是当前节点？
    // 切换到其同节点的下一个节点，不存在的话，切换到同节点的上一个节点，节点为空则切换到父节点
    // handleNodeClick().
    node.parent.removeChild(node)
    if (nextNodeId) {
      setCurrentKey(nextNodeId)
    }
    Modal.message({
          status: 'success',
          message: response.errMsg,
        })
    }

    })
}
const articleInfo = articleStore();

const bookCategory = async () => {
  mobileStore.setInfo({splitInit: '0px', showCollapse: true})
  articleInfo.showBookInfo = true
  let Params = {bookId: route.query.bookId}
  let res = await getBookCategory(Params)
  articleInfo.bookCategory = res.data
}

const getBookInfoData = async () => {
  let Params = {bookId: route.query.bookId}
  let res = await getBookInfo(Params)
  let tmpBookInfo = res.data
  articleInfo.$state.bookInfo = tmpBookInfo
  return res.data
}
const clickTimer = ref()
const handleNodeClick = async (data: any) => {
  mobileStore.setInfo({splitInit: '0px', showCollapse: true})

  clearTimeout(clickTimer.value);
    clickTimer.value=setTimeout(async function(){
        if (!(articleInfo.show)) {
    await articleInfo.saveArticle('自动保存成功')
    getArticle(data)
  } else {
    getArticle(data)
  }
    },200)
}

const getArticle = async (data) => {
    articleInfo.showBookInfo = false
    router.push({query: {...route.query, articleId:data.article_id, id: data.id}, hash: route.hash})
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

// 初始化获取树节点数据
const getArticleMenu = async () => {
  let menuParams = {articleId: route.query.articleId, bookId: route.query.bookId, id: route.query.id}
  const res = await articleMenuInit(menuParams)
  treeData.value = res.data
  // highlight.value = route.query.articleId
  setCurrentKey(route.query.articleId)
}
getArticleMenu()

onMounted(async () => {
  if (route.query.articleId) {
    articleInfo.showBookInfo = false
    getArticle({article_id: route.query.articleId, id: route.query.id})
  }
})
const isRoot = ref(false)


// 节点展开获取数据
const nodeExpand = async (data: any, node: any) => {
  let params = {articleId: data.article_id}
  let res = await articleMenu(params)
  // node.doCreateChildren(res.data)
  data.children = res.data
}
const nodeCollapse = (data: any, node: any) => {
}

const displayMore = () => {
}

const childFormRef = ref()
const rootFormRef = ref()
const setCurrentKey = (v: any) =>  {
  highlight.value = v
  expandeArr.value.push(v)
}
// 根节点下添加文章
const addRootArticle = () => {
  btnSubmit.value.loading = true
  rootFormRef.value
  .validate(async (valid: any) => {
    try {
      if (valid) {
        let params = {position: addRootPosition.value,articleId: bookInfo.value.id, name: rootFormData.value.name, category: rootFormData.value.category,
        flag: 0, isRoot: true, auth: rootFormData.value.auth, bookId: route.query.bookId, teamId: route.query.teamId}
        const response = await addArticleContent(params)
        if (addRootPosition.value === 'start') {
          treeData.value.unshift(response.data[0])
        }
        if (addRootPosition.value === 'end') {
          treeData.value.push(response.data[0])
        }
        boxRootVisibility.value = false
        setCurrentKey(response.data[0].article_id)
        handleNodeClick(response.data[0])
        Modal.message({
          status: 'success',
          message: response.errMsg,
        })
      } else {
        Modal.message({
        status: 'error',
        message: '表单数据校验失败，请检查您的输入是否正确',
      })
      }
    } finally {
      btnSubmit.value.loading = false
  }
    })
}

const addArticle = () => {
  btnSubmit.value.loading = true
  childFormRef.value
  .validate(async(valid: any) => {
    try {
      if (valid) {
        let params
      if (flag.value === 0) {
        params = {position: addChildPosition.value, category: formData.value.category,articleId: currentNode.value.data.article_id, name: formData.value.name, flag: flag.value, isRoot: false, auth: formData.value.auth, bookId: route.query.bookId, teamId: route.query.teamId}
      } else if (flag.value === -1 || flag.value === 1) {

        if (!(currentNode.value.parent.parent)) {
          params = {position: addChildPosition.value,category: formData.value.category,articleId: currentNode.value.data.article_id, fatherId: bookInfo.value.id, name: formData.value.name, flag: flag.value, isRoot: false, auth: formData.value.auth, bookId: route.query.bookId, teamId: route.query.teamId}
        } else {
        params = {position: addChildPosition.value,category: formData.value.category,articleId: currentNode.value.data.article_id, fatherId: currentNode.value.parent.data.article_id, name: formData.value.name, flag: flag.value, isRoot: false, auth: formData.value.auth, bookId: route.query.bookId, teamId: route.query.teamId}
        }
      }
      const response = await addArticleContent(params)
      boxVisibility.value = false
      // 插入到子节点第一位
      if (flag.value === 0) {
        if (addChildPosition.value === 'start') {
          let index = 0
          currentData.value.children.unshift(response.data[0])
          currentNode.value.insertChild({'data': response.data[0]}, index, true)
        }
        if (addChildPosition.value === 'end') {
          let index = currentData.value.children.length
          currentData.value.children.push(response.data[0])
          currentNode.value.insertChild({'data': response.data[0]}, index + 1, true)
        }
        currentNode.value.expand(()=> {
          nodeExpand(currentData.value, currentNode.value)
        }, currentNode.value.parent)
      }
      // 上方插入
      if (flag.value === -1) {
        if (currentNode.value.parent.level === 0) {
          let index = currentNode.value.parent.childNodes.indexOf(currentNode.value)
          currentNode.value.parent.data.splice(index, 0, response.data[0])
          currentNode.value.parent.insertChild({'data': response.data[0]}, index, true)
        } else {
          let index = currentNode.value.parent.childNodes.indexOf(currentNode.value)
          currentNode.value.parent.data.children.splice(index, 0, response.data[0])
          currentNode.value.parent.insertChild({'data': response.data[0]}, index, true)
        }
      }
      // 下方插入
      if (flag.value === 1) {
        if (currentNode.value.parent.level === 0) {
          let index = currentNode.value.parent.childNodes.indexOf(currentNode.value)
          currentNode.value.parent.data.splice(index + 1, 0, response.data[0])
          currentNode.value.parent.insertChild({'data': response.data[0]}, index + 1, true)
        } else {
          let index = currentNode.value.parent.childNodes.indexOf(currentNode.value)
          currentNode.value.parent.data.children.splice(index + 1, 0, response.data[0])
          currentNode.value.parent.insertChild({'data': response.data[0]}, index + 1, true)
        }


      }
      setCurrentKey(response.data[0].article_id)
      handleNodeClick(response.data[0])
      Modal.message({
        status: 'success',
        message: response.errMsg,
      })
      } else {
        Modal.message({
        status: 'error',
        message: '表单数据校验失败，请检查您的输入是否正确',
      })
      }
    }finally {
      btnSubmit.value.loading = false
    }
  })
}

const icons = ref({
  home: iconApp(),
  guide: iconCustom(),
  book: iconText(),
  component: iconTotal()
})
</script>

<style scoped lang="less">
.card-group {
  overflow: auto;
  max-height: 500px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.card-group:deep(.tiny-card) {
  cursor: pointer;
  margin: 5px 5px;
  height: 180px;
}
.expand-icon:hover {
  background-color: #d8dad9;
  border-radius: 6px;
}
.expand-icon {
  position: absolute;
  left: 20px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content:center
}
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
  width: calc(100% - 60px);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding-left: 15px;
}
.article-title {
  margin-left: 30px;
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
  max-width: calc(100% - 40px);
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
  display:none;
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
