<template>
  <div class="article-page">
    <div class="book-info" v-show="articleState.showBookInfo">
      <h2>{{articleState.bookInfo.name}}</h2>
      <span>标签：</span><tiny-tag v-show="articleState.bookInfo.category" color="blue">{{articleState.bookInfo.category}}</tiny-tag><span v-show="!(articleState.bookInfo.category)">无</span>
      <p>简介：{{articleState.bookInfo.description}}</p>
      <p>目录：</p>
      <tiny-tree :data="articleState.bookCategory" :props="props" default-expand-all></tiny-tree>
    </div>
    <div class="article-header" v-show="!(articleState.showBookInfo)">
      <div class="article-info">
        <TinyIconAdministrator />
        <span @click="goToPersonalPage" style="cursor: pointer">{{articleInfo.username}}</span>
        <TinyIconStarDisable />
        <span>{{articleInfo.collects}}</span>
        <LikeOutlined />
        <span>{{articleInfo.likes}}</span>
        <TinyIconEyeopen />
        <span>{{articleInfo.views}}</span>
        <TinyIconStatistics />
        <span>{{articleInfo.word_count}}字</span>
        <TinyIconClockWork />
        <span>{{articleInfo.read_time}}</span>
      </div>
      <!-- 面包屑 -->
      <!-- <Breadcrumb :items="['menu.space', 'space.team.teamSpace', 'space.team.teamSpace']" /> -->
      <div class="editor-button">
        <div v-show="articleInfo.show && articleInfo.role !== 'reader'" class="editor-child-button">
          <tiny-button size="small" type="primary" style="margin-right: 5px;border-radius: 6px" :reset-time="200" @click="edit">编辑</tiny-button>
        </div>
        <!-- 按钮操作 -->
        <div v-show="!(articleInfo.show)  && articleInfo.role !== 'reader'" class="editor-child-button">
          <tiny-button size="small" type="primary" style="margin-right: 5px;border-radius: 6px" @click="articleInfo.saveArticle()">保存</tiny-button>
          <tiny-button size="small" :reset-time="200" style="margin-right: 5px;border-radius: 6px"
          @click="articleInfo.saveArticle('已为您自动保存，请放心预览');
          articleInfo.show = !(articleInfo.show)">预览</tiny-button>
        </div>

        <div
          v-show="articleInfo.show && articleInfo.role !== 'reader'"
          class="like-collect-hover editor-child-icon"
          @click="edit">
          <TinyIconWriting  style="margin: 6px" />
        </div>

        <div
          v-show="!(articleInfo.show)  && articleInfo.role !== 'reader'"
          class="like-collect-hover editor-child-icon"
          @click="articleInfo.saveArticle('已为您自动保存，请放心预览');
          articleInfo.show = !(articleInfo.show)">
          <TinyIconSave style="margin: 6px" />
        </div>


        <div  class="like-collect-hover"  v-show="!(articleInfo.is_collect)" @click="clickIcon('collect', 1)">
          <TinyIconStarDisable style="margin: 6px" />
        </div>

        <div  class="like-collect-hover"  v-show="articleInfo.is_collect" @click="clickIcon('collect', -1)">
          <TinyIconStarActive style="margin: 6px; fill: #ecaa04"/>
        </div>

        <div class="like-collect-hover like-fill"  v-show="articleInfo.is_like" @click="clickIcon('like', -1)">
          <LikeFilled style="margin: 6px;"/>
        </div>

        <div class="like-collect-hover" v-show="!(articleInfo.is_like)" @click="clickIcon('like', 1)">
          <LikeOutlined style="margin: 6px;" />
        </div>

        <div class="like-collect-hover" @click="displayComment">
          <TinyIconDialog style="margin: 6px;" />
        </div>

        <div class="like-collect-hover svg-category" @click="mobileStore.showAnchor=!mobileStore.showAnchor">
          <TinyIconRichTextListUnordered style="margin: 6px;" />
        </div>
        <!-- </div> -->
      </div>
    </div>
    <!-- 文章区域 -->
    <div class="article-content" v-show="!(articleState.showBookInfo)">
      <!-- 文章标题显示区域 -->
      <!-- <h1 v-show="show" style="padding: 0 20%">Python基础</h1> -->

      <!-- 文章显示区域 -->
      <div id="main-content" :class="{'main-content-enter': articleInfo.show, 'main-content-leave': !articleInfo.show}">
        <!-- 文章标题 -->
        <h1 v-show="articleInfo.show" style="color: black;" class="article-title">
          {{articleState.name}}
        </h1>
          <div id='preview'>
          </div>
          <div class="about">
            <Footer style="padding: 40px 0 20px 0"/>
          </div>
      </div>


    <!-- 文章编辑区域 -->
    <!-- <div v-show="show" id='vditor'></div> -->
    <div id='vditor' v-show="!(articleInfo.show)" style="border-top: none;border-bottom: none"></div>
    </div>
    <!-- 文章目录pc -->
    <tiny-drawer  class="category-pc" style="max-width: 100%" title="目录" v-show="mobileStore.is_pc && !articleState.showBookInfo"
      placement="right"
      :visible="articleInfo.show"
      :mask="false"
      @update:visible="articleInfo.show = $event">
        <tiny-anchor
          type="dot"
          :links="links"
          container-id="#main-content"
          @link-click="handleClick"
        >
        </tiny-anchor>
    </tiny-drawer>
    <!-- 文章目录mobile -->
    <tiny-drawer  class="category-mobile" style="max-width: 100%" title="目录" v-show="!mobileStore.is_pc && !articleState.showBookInfo"
      :placement="mobileStore.placement"
      :visible="mobileStore.showAnchor"
      :mask="mobileStore.showAnchor"
      @update:visible="mobileStore.showAnchor = $event">
      <tiny-anchor
        type="dot"
        :links="links"
        container-id="#main-content"
        @link-click="handleClick"
      >
      </tiny-anchor>
    </tiny-drawer>
    <tiny-drawer class="comment-mobile" style="max-width: 100%" title="评论"
      :placement="mobileStore.placement"
      :visible="commentVisibility"
      @close="closeDrawer"
      :mask="true"
      @update:visible="commentVisibility = $event">
      <!-- 添加评论输入框 -->
      <div class="input-comment">
        <div style="display: flex;align-items: center;">
          <img src="@/assets/images/avatar.png" style="width: 30px; height: 30px" alt="user"  v-show="!(userStore.avatar)"/>
          <tiny-user-head round v-model="userStore.avatar" type="image" alt="user" v-show="userStore.avatar" style="width: 30px; height: 30px"></tiny-user-head>
        </div>

        <div style="width: 100%;padding-left: 10px;display: flex;flex-direction: column">
          <tiny-input type="textarea" v-model="commentValue" :maxlength="1000" show-word-limit
            resize="none"
            :autosize="{ minRows: 0, maxRows: 4 }"
            placeholder="请输入评论:"></tiny-input>
          <div style="display: flex;">
            <tiny-button type="primary" size="small" :loading="btnSubmit.loading" style="margin-top: 5px;border-radius: 6px"  @click="addNewComment">{{
              btnSubmit.text[btnSubmit.loading]
            }}</tiny-button>
            <!-- <tiny-button size="small" type="primary" style="margin-top: 5px;border-radius: 6px">评论</tiny-button> -->
          </div>
        </div>
      </div>
      <!-- 评论内容 -->
      <div class="comment" v-for="item in commentData" :key="item.id">
        <div style="display: flex;align-items: center;">
          <img src="@/assets/images/avatar.png" style="width: 30px; height: 30px; cursor: pointer" alt="user"  v-show="!(item.avatar)"/>
          <tiny-user-head round v-model="item.avatar" type="image" alt="user" v-show="item.avatar" style="width: 30px; height: 30px; cursor: pointer"></tiny-user-head>
          <span style="color: #777888;margin-left: 10px;cursor: pointer">{{item.username}}</span>
        </div>
        <div style="width: 100%;padding-left: 40px; display: flex;flex-direction: column;">
          <p style="color: black; width: calc(100% - 10px); word-wrap:break-word;">{{item.comment}}</p>
          <div style="display: flex;justify-content: space-between;align-items: center;">
            <div>
              <span style="color: #777888; margin-right: 20px">{{item.create_time}}</span>
              <span style="color: #777888; cursor: pointer" @click="reply(item)">回复</span>
            </div>
            <div>
              <LikeOutlined style="margin: 6px;cursor: pointer" @click="likesComment(item, 1, 'like')" v-show="!(item.is_like)"/>
              <LikeFilled style="margin: 6px;cursor: pointer;fill: #ecaa04" v-show="item.is_like"  @click="likesComment(item, -1, 'like')" />
              <span>{{item.likes}}</span>
              <DislikeOutlined style="margin: 6px;cursor: pointer" @click="likesComment(item, 1, 'unlike')"  v-show="!(item.is_unlike)" />
              <DislikeFilled style="margin: 6px;cursor: pointer;fill: #ecaa04" v-show="item.is_unlike" @click="likesComment(item, -1, 'unlike')" />
              <span>{{item.unlikes}}</span>
            </div>
          </div>
          <div  v-if="replyVisibility && item.id === currentComment.id">
            <tiny-input type="textarea" v-model="replyCommentValue" :maxlength="1000"
            show-word-limit
            resize="none"
            :autosize="{ minRows: 4, maxRows: 4 }"
            :placeholder="`回复：${item.username}`"></tiny-input>
            <tiny-button type="primary" size="small" :loading="btnSubmit.loading" style="margin-top: 5px;border-radius: 6px"  @click="replyNewComment">{{
              btnSubmit.text[btnSubmit.loading]
            }}</tiny-button>
          </div>
          <!-- 子评论 -->
          <div class="child-comment" v-for="child in item.children" :key="child.id">
            <div style="display: flex;align-items: center;">
              <img src="@/assets/images/avatar.png" style="width: 30px; height: 30px; cursor: pointer" alt="user"  v-show="!(child.avatar)"/>
              <tiny-user-head round v-model="child.avatar" type="image" alt="user" v-show="child.avatar" style="width: 30px; height: 30px; cursor: pointer"></tiny-user-head>
              <span style="color: #777888;margin-left: 10px;cursor: pointer">{{child.user_name}}</span>
              <TinyIconDeltaRight style="fill: #777888; width: 8px; height: 8px; margin: 0 2px"/>
              <span style="color: #777888">{{child.reply_user_name}}</span>
            </div>
            <p style="color: black; width: calc(100% - 10px); word-wrap:break-word;padding-left: 40px;">{{child.comment}}</p>
            <div style="display: flex;justify-content: space-between;align-items: center;padding-left: 40px">
              <div>
                <span style="color: #777888; margin-right: 20px">{{child.create_time}}</span>
                <span style="color: #777888; cursor: pointer" @click="reply(child)">回复</span>
              </div>

              <div>
                <LikeOutlined style="margin: 6px;cursor: pointer" @click="likesComment(child, 1, 'like')" v-show="!(child.is_like)"/>
                <LikeFilled style="margin: 6px;cursor: pointer;fill: #ecaa04" v-show="child.is_like"  @click="likesComment(child, -1, 'like')" />
                <span>{{child.likes}}</span>
                <DislikeOutlined style="margin: 6px;cursor: pointer" @click="likesComment(child, 1, 'unlike')"  v-show="!(child.is_unlike)" />
                <DislikeFilled style="margin: 6px;cursor: pointer;fill: #ecaa04" v-show="child.is_unlike" @click="likesComment(child, -1, 'unlike')" />
                <span>{{child.unlikes}}</span>
              </div>

            </div>
          <div  v-if="replyVisibility && child.id === currentComment.id">
            <tiny-input type="textarea" v-model="replyCommentValue" :maxlength="1000"
            show-word-limit
            resize="none"
            :autosize="{ minRows: 4, maxRows: 4 }"
            :placeholder="`回复：${child.user_name}`"></tiny-input>
            <tiny-button type="primary" size="small" :loading="btnSubmit.loading" style="margin-top: 5px;border-radius: 6px"  @click="replyNewComment">{{
              btnSubmit.text[btnSubmit.loading]
            }}</tiny-button>
          </div>
          </div>
        </div>
      </div>
    </tiny-drawer>
  </div>
  <ToTop class="to-top" @click="scrollToTop" v-show="scrollObj.y >= 500 && !(articleState.showBookInfo) && articleInfo.show"  />
  <ToBottom class="to-bottom" @click="scrollToBottom"  v-show="!(articleState.showBookInfo)  && articleInfo.show"/>

</template>

<script lang="ts" setup>
import ToTop from '@/components/to-top/index.vue'
import ToBottom from '@/components/to-bottom/index.vue'

import {
  ReadOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  LikeOutlined,
  TeamOutlined,
  UserOutlined,
  LikeFilled,
  DislikeOutlined,
  DislikeFilled
} from '@ant-design/icons-vue'
import Footer from '@/components/footer/index.vue';

import { UserHead as TinyUserHead, Modal, Button as TinyButton, Anchor as TinyAnchor, Tag as TinyTag,
Tree as TinyTree, Split as TinySplit, Tooltip as TinyTooltip, DialogBox as TinyDialogBox,
Drawer as TinyDrawer,  TextPopup as TinyTextPopup, Input as TinyInput, Divider as TinyDivider } from '@opentiny/vue';
import { onBeforeUnmount, onMounted, reactive, ref, shallowRef, watch, defineComponent, onUnmounted, nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import Vditor from 'vditor'
import "vditor/src/assets/less/index.less"
import { useRoute, useRouter } from 'vue-router';
import {saveArticleContent, addComment, getComment, patchComment} from '@/api/article'
import { articleStore, useMobileStore } from '@/store';
import {IconEyeopen, IconHeartempty, IconStarDisable, IconStarActive, IconMeh, IconSmileO,
IconSmile, IconAdministrator, IconClockWork, IconStatistics, IconInformation, IconDeltaRight, IconDialog,
IconRichTextListUnordered, IconWriting, IconSave, IconClose} from '@opentiny/vue-icon';
import { useAppStore, useUserStore } from '@/store';
import { Md5 } from "ts-md5";

const  requestFullScreen = () => {
  let de: any = document.documentElement;
  if (de.requestFullscreen) {
    de.requestFullscreen();
  } else if (de.mozRequestFullScreen) {
    de.mozRequestFullScreen();
  } else if (de.webkitRequestFullScreen) {
    de.webkitRequestFullScreen();
  }
}
const exitFullscreen =() => {
  let de: any = document;
  if (de.exitFullscreen) {
    de.exitFullscreen();
  } else if (de.mozCancelFullScreen) {
    de.mozCancelFullScreen();
  } else if (de.webkitCancelFullScreen) {
    de.webkitCancelFullScreen();
  }
}
onMounted(() => {
})

onUnmounted(() => {
  // let articlePageDom: any = document.getElementById('main-content');
  // articlePageDom.removeEventListener('touchstart')
  // articlePageDom.removeEventListener('touchmove')
})


const displayComment = () => {
  if (commentVisibility.value) {
    commentVisibility.value=false
  } else {
    commentVisibility.value=true
    getCommentData()
  }
}
const TinyIconClose = IconClose()
const TinyIconSave = IconSave()
const TinyIconWriting = IconWriting()
const TinyIconRichTextListUnordered = IconRichTextListUnordered()
const TinyIconDeltaRight = IconDeltaRight()
const mobileStore = useMobileStore()
const scrollObj = reactive({
  x: 0,
  y: 0
})

const isRollingUp = ref(false)
const isRollingDown = ref(false)

onMounted(() => {
  let ele: any = document.getElementById('main-content')
  ele.onscroll = () => {
    scrollObj.x = parseInt(document.getElementById('main-content').scrollLeft, 10)
    scrollObj.y = parseInt(document.getElementById('main-content').scrollTop, 10)
  }
})


const scrollToBottom = () => {
  isRollingDown.value = true
  let domMainContent: any = document.getElementById('main-content')
  let currentScroll = domMainContent.scrollTop;   // 已经被卷掉的高度
  let clientHeight = domMainContent.offsetHeight; // 容器高度
  let contentHeight: any = domMainContent.scrollHeight; // 内容总高度
  if (contentHeight - currentScroll - clientHeight > 10 && !(isRollingUp.value)) {
    window.requestAnimationFrame(scrollToBottom);
    domMainContent.scrollTo(0, currentScroll + (contentHeight - currentScroll - clientHeight) / 8);
  } else {
    isRollingDown.value = false
  }
}
const scrollToTop = () => {
    isRollingUp.value = true
    let ele: any = document.getElementById('main-content')
    let sTop: any = document.getElementById('main-content')?.scrollTop

    if (sTop > 0 && !(isRollingDown.value)) {
        window.requestAnimationFrame(scrollToTop)
        ele.scrollTo(0, sTop - sTop / 8)
    } else {
      isRollingUp.value = false
    }
}
const btnSubmit = ref({
  loading: false,
  text: {
    true: '提交中',
    false: '评论'
  }
})

const userStore = useUserStore();
// 评论点赞
const likesComment = async(data: any, f: number, opType: string) => {
  let params = {
    id: data.id,
    flag: f,
    operationType: opType
  }
  let res = await patchComment(params)
  getCommentData()
}
// 评论弹窗
const currentComment = ref(null)
const replyVisibility = ref(false)
const commentVisibility = ref(false)
const replyCommentValue = ref(null)
const commentValue = ref(null)
const commentData = ref([])

const reply = (data: any) => {
  if (!currentComment.value) {
    currentComment.value = data
    replyVisibility.value = true
  } else if (currentComment.value.id === data.id) {
    replyVisibility.value = !(replyVisibility.value)
  } else {
    currentComment.value = data
    replyVisibility.value = true
  }
}
const closeDrawer = () => {
  currentComment.value = null
  replyVisibility.value = false
}
const getCommentData = async () => {
  let params = {id: articleInfo.id}
  let res = await getComment(params)
  commentData.value = res.data
}
const replyNewComment = async() => {
  if (replyCommentValue.value) {
    btnSubmit.value.loading = true
  let data = {id: articleInfo.id,
    replyCommentId: currentComment.value.id,
    comment: replyCommentValue.value,
    replyUserId: currentComment.value.user_id,
    replyUserName: currentComment.value.user_name,
    firstCommentId: currentComment.value.reply_comment_id?currentComment.value.first_comment_id:currentComment.value.id
    }
  try {
    let res = await addComment(data)
    getCommentData()
    replyCommentValue.value = null
    replyVisibility.value = false
  } finally {
    btnSubmit.value.loading = false
  }
  } else {
      Modal.message({
          message: '评论内容不能为空',
          status: 'error',
        });
  }
}
const addNewComment = async () => {
  if (commentValue.value) {
    btnSubmit.value.loading = true
  let data = {id: articleInfo.id, comment: commentValue.value}
  try {
    let res = await addComment(data)
    getCommentData()
    commentValue.value = null
  } finally {
    btnSubmit.value.loading = false
  }
  } else {
      Modal.message({
          message: '评论内容不能为空',
          status: 'error',
        });
  }

}


defineComponent({
  components: {
    LikeOutlined,
    LikeFilled,
    DislikeOutlined,
    DislikeFilled
  },
});
const TinyIconDialog = IconDialog()
const TinyIconEyeopen = IconEyeopen()
const TinyIconHeartempty = IconHeartempty()
const TinyIconStarDisable = IconStarDisable()
const TinyIconStarActive = IconStarActive()
const TinyIconMeh = IconMeh()
const TinyIconSmileO = IconSmileO()
const TinyIconSmile = IconSmile()
const TinyIconAdministrator = IconAdministrator()
const TinyIconClockWork = IconClockWork()
const TinyIconStatistics = IconStatistics()


const props = ref({
  children: 'children',
  label: 'name', // 别名
  disabled: 'disabled',
  isLeaf: 'isLeaf'
})
const dataTree = ref([{
          id: '1',
          name: '数据 1'
        },
        {
          id: '2',
          name: '数据 2',
          disabled: true,
          children: [
            { id: '2-1', name: '数据 2-1', disabled: true },
            { id: '2-2', name: '数据 2-2', disabled: true }
          ]
        }])

const route = useRoute()
const router = useRouter()

const articleInfo = articleStore();
const articleInfoRefs = storeToRefs(articleInfo)
const articleState = articleInfo.$state

const goToPersonalPage = () => {
  const { href } = router.resolve({
                path: `/personal/${articleInfo.username}/${articleInfo.create_person}`
              })
  window.open(href, '_blank')
}

const clickIcon = (t: string, n: number) => {
  articleInfo.updateStatistic({flag: t, operation: n, id: articleInfo.id})
}
const action = ref<string>();

const links = ref([{}])

function handleClick(e, link) {
  e.preventDefault()
  router.push({query: route.query, hash: link.link})
  if (window.innerWidth <= 1024) {
    mobileStore.showAnchor = false
  }
}



const edit = () => {
  articleInfo.show = !(articleInfo.show)
  if (articleInfo.editorRef) {
    articleInfo.editorRef.setValue(articleState.content)
  } else {
    articleInfo.editorRef = new Vditor('vditor', {
      image: {
        isPreview: true
      },
    keydown: (ev) => {
      if (ev.ctrlKey && ev.key === 's') {
        ev.preventDefault()
        articleInfo.saveArticle()
      }
    },
    upload: {
      url: '/api/article/upload',
      headers: {'X-Csrf-Token': localStorage.getItem('token')},
      withCredentials: true,
      max: 100 * 1024 * 1024,
      accept: 'image/*,.mp3, .wav, .rar, .mp4, .zip',
      success: (editor: HTMLPreElement, msg: string) => {
        let res = JSON.parse(msg)
        let u: string = res.data.successMap.url
        let mediaType = res.data.successMap.media_type
        if (mediaType === 'image') {
          articleInfo.editorRef.insertValue(`![图片](${u})`, true)
        } else if (mediaType === 'video') {
          articleInfo.editorRef.insertValue(`${u}`, true)
        } else {
          articleInfo.editorRef.insertValue(`${u}`, true)
        }
      }
    },
    height: 'calc(var(--vh, 1vh) * 100 - 111px)',
    width: '100%',
    placeholder: '在此输入内容',
    debugger: false,
    mode: 'wysiwyg',
    outline: {
      enable: true,
      position: "right"
    },
    counter: {
      enable: true,
      type: 'markdown',
      max: 655355,
      after: (length, counter) => {
        if (length > counter.max) {
          Modal.message({
            message: `文章字数过多，限制${counter.max}`,
            status: 'error',
          });
        }
      }
    },
    cache: {
      enable: true
    },
    resize: {
      enable: false,
      position: 'bottom'
    },
    fullscreen: {
      index: 9999999
    },
    after: () => {
      articleInfo.editorRef.setValue(articleState.content)
    }
  })
  }
}

const getAnchor =() => {
  let eles = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  // 获取文章里 h1 到 h6 的元素
  let doms = document.querySelector('#preview').querySelectorAll(eles.toString())
  const root = { children: [] }
  let current = root
  Array.from(doms)
    .filter(item => item.localName.indexOf('h') === 0)
    .forEach(item => {
      let md5Key = Md5.hashStr(item.id)
      const obj = { node: item,
        key: md5Key,
        children: [],
        parent: undefined,
        link: `#${item.id}`,
        title: item.textContent?.toString()}
      while (current !== root && current.node.localName[1] - obj.node.localName[1] !== -1) {
        current = current.parent
      }
      obj.parent = current
      obj.parent.children.push(obj)
      current = obj
    })
  if (root.children.length === 0) {
    links.value = [{}]
  } else {
    links.value = root.children
  }
  if (route.hash) {
    let domMainContent = document.getElementById('main-content')
    let domHash = document.getElementById(route.hash.replace('#', ''))
    if (mobileStore.is_pc) {
      domMainContent?.scrollTo(0, domHash?.getBoundingClientRect().top - 120)
    } else {
      domMainContent?.scrollTo(0, domHash?.getBoundingClientRect().top - 70)
    }
  }
}

const handleBeforeUnload = () => {
  if (!(articleInfo.show)) {
       articleInfo.saveArticle('自动保存成功')
    }
}
const previewElement = ref()
const saveArticleInterval = ref()
onMounted(() => {
  previewElement.value = document.getElementById('preview')
  window.addEventListener('beforeunload', handleBeforeUnload);
})


watch(articleInfoRefs.show, (newValue, oldValue) => {
    if (articleInfo.show) {
      clearInterval(saveArticleInterval.value)
    } else {
      saveArticleInterval.value = setInterval(() => {
        // 如果处于编辑状态
        if (!(articleInfo.show)) {
          articleInfo.saveArticle('自动保存成功')
        }
      }, 60 * 1000)
    }
  })

watch(articleInfoRefs.content, (newValue, oldValue) => {
    let conf = {
      mode: 'light',
      hljs: {
        defaultLang: 'python',
        style: 'dracula',
        lineNumber: true
      },
      markdown: {
        toc: true,
        autoSpace: true,
        mark: true,
      },
      // anchor: 1,
      after() {
          getAnchor()
          // Vditor.outlineRender(previewElement, outlineElement)
      },
      lazyLoadImage: 'https://cdn.jsdelivr.net/npm/vditor/dist/images/img-loading.svg'
  }
    Vditor.preview(previewElement.value, newValue, conf)
  })

const selectedKeys1 = ref<string[]>(['2']);
const selectedKeys2 = ref<string[]>(['1']);
const openKeys = ref<string[]>(['sub1']);

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(async () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
    const editor = articleInfo.editorRef
    if (editor == null) return
    editor.destroy()
    clearInterval(saveArticleInterval.value)
})

</script>


<style scoped lang="less">
.category-pc {
  &:deep(.tiny-drawer-main) {
    max-height: calc(100vh - 150px);
    max-height: calc(var(--vh, 1vh) * 100 - 150px);
    box-shadow: none;
    border-style: none;
    width: 280px !important;
    right: 20px;
    top: 145px;
  }
  &:deep(.tiny-drawer__body) {
    padding: 10px 0 !important;
  }
  &:deep(.tiny-drawer__headerbtn) {
    display: none;
  }
  &:deep(.tiny-drawer__header) {
    border-bottom: none !important;
  }

}
.drag-effects {
    -webkit-transition-timing-function: linear;
    transition-timing-function: linear;
    -webkit-transition-duration: .2s;
    transition-duration: .2s;
    -webkit-transition-property: all;
    transition-property: all;
}
.editor-child-icon {
  display: none;
}
.to-bottom {
  z-index: 9999;

  position: fixed;
  bottom: 60px;
  right: 24px;
}
.to-top {
  z-index: 9999;
  position: fixed;
  bottom: 122px;
  right: 24px;
}

.child-comment {
  display: flex;
  font-size: 1rem;
  margin-top: 15px;
  flex-direction: column;
}
.comment {
  flex-direction: column;
  font-size: 1rem;
  max-width: 100%;
  display: flex;
  margin: 15px 0px
}
.input-comment {
  font-size: 1rem;
  max-width: 100%;
  display: flex;
  margin: 15px 0;
  align-items: flex-start;

}
.input-comment:deep(.tiny-user-head__portrait) {
  border-radius: 50%;
  border: 1px solid #e8e8ed;
  width: 30px;
  height: 30px;
}
.comment:deep(.tiny-user-head__portrait) {
  border-radius: 50%;
  border: 1px solid #e8e8ed;
  width: 30px;
  height: 30px;
}
.article-page:deep(.tiny-dialog-box) {
  border-radius: 0px !important
}
:deep(.tiny-anchor-orbit) {
  width: 2px;
}
:deep(.tiny-anchor-orbit-skid--active) {
  width: 2px;
}
.article-info:deep(svg) {
  fill: #8994aa;
  margin: 0px 10px;
  vertical-align: middle;
  font-size: 14px;
}
.article-info span {
  font-size: 13px;
}
.article-info {
  color: #8994aa;
  display: flex;
  align-items: center;
}
.article-header {
  justify-content: space-between;
  // flex-direction: row-reverse;
  display: flex;
  height: 51px;
  border-bottom: 1px solid #dfe1e6;
}
.like-collect-hover:deep(.anticon-like svg) {
  color: black;
  width: 18px;
  height: 18px;
}
.like-fill:deep(.anticon-like svg) {
  fill: #ecaa04;
}
.like-collect-hover {
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 8px;
  margin: 2px;
}
.like-collect-hover:hover {
  background-color: #eff0f0;
  border-radius: 4px;
}

.like-collect {
  display: flex;
  align-items: center;
}
.editor-button:deep(.tiny-svg) {
  width: 18px;
  height: 18px;
}
.like-collect:deep(.tiny-svg) {
  width: 18px;
  height: 18px;
}
.book-info:deep(.tiny-tree) {
  border-radius: 15px;
}
.book-info {
  color: black;
  background-color: #f5f6f7;
  margin: 20px;
  border-radius: 15px;
  height: calc(100vh - 100px);
  height: calc(var(--vh, 1vh) * 100 - 100px);
  padding: 10px 30px;
  overflow: auto;
}
.editor-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 10px;
}
.article-page {
  display: flex;
  flex-direction: column;
  // padding: 0  0 28px 28px;
  height: calc(100vh - 60px);
  height: calc(var(--vh, 1vh) * 100 - 60px);
  height: fit-content;
  min-width: calc(100% - 278px);
  width: 100%;
}
.article-content {

  width: 100%;
  // display: flex;
  // flex: 1;
  flex-direction: row;
}
:deep(.tiny-anchor) {
  background-color: var(--textarea-background-color);
}
:deep(.tiny-anchor__wrapper) {
  width: 100%;
}

.article-title {
  word-break: break-word;
  margin: 22px 0px;
  width: 100%;
}
#main-content {
  opacity: 1;
  width: 100%;
  max-height: calc(100vh - 60px - 51px);
  max-height: calc(var(--vh, 1vh) * 100 - 60px - 51px);
  padding-right: 500px;
  padding-left: 200px;
  // flex: 1;
  // min-width: 1px;
  overflow: auto;
  margin-left: -1px;
  border-left: 1px solid var(--border-color);
  box-sizing: border-box;
  border-radius: 0 0 3px 0;
  background-color: var(--textarea-background-color);
}
#preview {
  width: 100%;
  min-height: calc(100vh - 60px - 51px - 92px - 80px);
  min-height: calc(var(--vh, 1vh) * 100 - 60px - 51px - 92px - 80px);
}
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
.svg-category {
  display: none;
}
:deep(.drawer-body::-webkit-scrollbar) {
      display: none; /* Chrome Safari */
      // 或者 width: 0;
}

#main-content {
  -webkit-transition-timing-function: linear;
  transition-timing-function: linear;
  -webkit-transition-duration: .2s;
  transition-duration: .2s;
  -webkit-transition-property: all;
  transition-property: all;
}

.main-content-enter {
  -webkit-animation: slideTop .2s linear;
  animation: slideTop .2s linear;
}
.main-content-leave {
  -webkit-animation: slideBottomout .2s linear;
  animation: slideBottomout .2s linear;
}
.main-content-enter {
  opacity: 1;
  visibility: visible;
}
.main-content-leave {
  height: 0;
  opacity: 0;
  visibility: hidden;
}


</style>


<style lang="less" scoped>
  @media screen and (min-width: @screen-mm) {
    .editor-child-icon {
        display: none;
      }
  }

  @media screen and (max-width: @screen-mm) {
    .article-info {
      display: none;
    }
    .comment-mobile:deep(.tiny-drawer-main) {
      box-shadow: none;
      width: 100% !important;
      height: 80%;
      border-style: none;
      &::-webkit-scrollbar {
        display: none; /* Chrome Safari */
        // 或者 width: 0;
      }
    }
    .category-mobile:deep(.tiny-drawer-main) {
      box-shadow: none;
      width: 100% !important;
      height: 80%;
      border-style: none;
      &::-webkit-scrollbar {
        display: none; /* Chrome Safari */
        // 或者 width: 0;
      }
    }

    .editor-button {
      width: 100%;
      justify-content: space-between;
    }

    #main-content {
      padding-right: 30px;
      padding-left: 30px;
    }

    .editor-button {
      .editor-child-button {
        display: none;
        }
        .editor-child-icon {
          display: block;
        }
    }
    .article-page{
      flex-direction: column-reverse;
    }
    .article-header {
      border-top: 1px solid #dfe1e6;
      border-bottom: none;
      background-color: white;
    }
    .svg-category {
      display: block;
    }
  }
</style>

<style lang="less" scoped>
 @media  screen and (min-width: @screen-mm) and (max-width: @screen-ml) {
    .article-header{
      flex-direction: row-reverse;
    }
    #main-content {
      padding-right: 30px;
      padding-left: 30px;
    }
    .article-info {
      display: none;
    }
    .category-pc {
      display: none;
    }
 }
  @media  screen and (min-width: @screen-ml) and (max-width: @screen-sm) {
    #main-content {
      padding-right: 300px;
      padding-left: 30px;
    }
  }
</style>




