<template>
  <div class="article-page">
    <div class="article-header">
      <!-- 面包屑 -->
      <Breadcrumb :items="['menu.space', 'space.team.teamSpace', 'space.team.teamSpace']" />
      <div class="editor-button" >
        <div v-show="show">
          <tiny-button size="small" type="primary" style="margin-right: 5px" :reset-time="200" @click="edit">编辑</tiny-button>
          <tiny-button size="small" :disabled="show">取消</tiny-button>
        </div>
        <!-- 按钮操作 -->
        <div v-show="!show">
          <tiny-button size="small" type="primary" style="margin-right: 5px" @click="saveArticle">保存</tiny-button>
          <tiny-button size="small" :reset-time="200" @click="show = !(show)">取消</tiny-button>
        </div>
        <!-- 数据统计 -->
        <div style="margin-bottom: 5px;margin-left: 8px;" class="">
          <TinyIconHeartempty style="margin-left: 8px;cursor: pointer" class="svgs-ico" @click="like"/>
          <span style="padding-left: 8px; cursor: auto">
            {{ likes }}
          </span>
          <TinyIconEyeopen style="margin-left: 8px;cursor: pointer" class="svgs-ico"/>
          <span style="padding-left: 8px; cursor: auto">
            {{ views }}
          </span>
        </div>
      </div>
    </div>
    <!-- 文章区域 -->
    <div class="article-content">
      <!-- 文章标题显示区域 -->
      <!-- <h1 v-show="show" style="padding: 0 20%">Python基础</h1> -->
      <!-- 文章显示区域 -->
      <div v-show="show" id='preview'></div>
      <!-- 文章目录 -->
      <tiny-anchor
        v-show="show"
        id="category"
        :links="links"
        container-id="#preview"
        mark-class="is-active-anchor"
        @change="handleAnchorChange"
        @link-click="handleClick"
      ></tiny-anchor>
      <!-- <div v-show="show" id='outline'></div> -->
      <!-- 文章编辑区域 -->
      <!-- <div v-show="show" id='vditor'></div> -->
      <div v-show="!show" id='vditor'></div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { Modal, Button as TinyButton, Anchor as TinyAnchor } from '@opentiny/vue';
import { onBeforeUnmount, onMounted, reactive, ref, shallowRef, watch } from 'vue';
import Vditor from 'vditor'
import "vditor/src/assets/less/index.less"
import {saveArticleContent} from '@/api/article'
import { useRoute, useRouter } from 'vue-router';
import { articleStore } from '@/store';
import {IconEyeopen, IconHeartempty} from '@opentiny/vue-icon';

const TinyIconEyeopen = IconEyeopen()
const TinyIconHeartempty = IconHeartempty()


const route = useRoute()
const router = useRouter()

const articleInfo = articleStore();
const articleState = articleInfo.$state

const likes = ref<number>(0);
const views = ref<number>(0);
const action = ref<string>();
const editorRef = shallowRef()

const show = ref(true)
// const show = articleState.show_edit
const links = ref([])
function handleClick(e, link) {
  e.preventDefault()
}

function handleAnchorChange(link) {
  router.push({query: {...route.query}, hash: link})
}

const edit = () => {
  show.value = !(show.value)
  if (editorRef.value) {
    editorRef.value.setValue(articleState.content)
  } else {
    editorRef.value = new Vditor('vditor', {
    // height: 'calc(100vh - 204px)',
    height: 'calc(100vh - 220px)',
    width: '100%',
    placeholder: '在此输入内容',
    debugger: true,
    mode: 'wysiwyg',
    outline: {
      enable: true,
      position: "left"
    },
    counter: {
      enable: true
    },
    comment: {
      enable: true
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
      editorRef.value.setValue(articleState.content)
    }
  })
  }
}

const like = () => {
  likes.value = 1;
  views.value = 0;
  action.value = 'liked';
};

const dislike = () => {
  likes.value = 0;
  views.value = 1;
  action.value = 'disliked';
};
const getAnchor =() => {
  let eles = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  // 获取文章里 h1 到 h6 的元素
  let doms = document.querySelector('#preview').querySelectorAll(eles.toString())
  const root = { children: [] }
  let current = root
  Array.from(doms)
    .filter(item => item.localName.indexOf('h') === 0)
    .forEach(item => {
      const obj = { node: item,
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
  links.value = root.children
}

onMounted(() => {
  const previewElement = document.getElementById('preview')
  // const outlineElement = document.getElementById('outline')
  watch(
  articleState, // 注意这里变化
  (val,old) => {
    if (editorRef.value) {
      if (!show.value) {
        show.value = !show.value
      }
    }
    Vditor.preview(previewElement, val.content, {
      anchor: 1,
      after() {
          getAnchor()
          // Vditor.outlineRender(previewElement, outlineElement)
      },
      lazyLoadImage: 'https://cdn.jsdelivr.net/npm/vditor/dist/images/img-loading.svg'
    })
  }
)
})
const saveArticle = () => {
  let data = {teamId: route.query.teamId, bookId: route.query.bookId,
  articleId: route.query.articleId, content:  editorRef.value.getValue()}
  saveArticleContent(data).then((res) => {
     Modal.message({
      status: 'success',
      message: res.errMsg,
  })
  })
};

const selectedKeys1 = ref<string[]>(['2']);
const selectedKeys2 = ref<string[]>(['1']);
const openKeys = ref<string[]>(['sub1']);

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})


</script>

<style scoped lang="less">
:deep(.svgs-icon:hover) {
  transform: scale(1.5, 1.5);
}
.editor-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  margin-top: 5px
}
.article-page {
  display: flex;
  flex-direction: column;
  // position: relative;
  padding: 0  0 28px 28px;
  height: calc(100vh - 135px);
}
.article-content {
  width: 100%;
  display: flex;
  height: calc(100vh - 220px);
  flex: 1;
  flex-direction: row;
}
:deep(.tiny-anchor) {
  background-color: var(--textarea-background-color);
}
#category {
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
    // 或者 width: 0;
  }
  position: fixed;
  width: 250px;
  top: 145px;
  right: 20px;
  bottom: 20px;
  overflow: auto;
  max-height: calc(100vh - 220px);
}
#outline {
  position: fixed;
  width: 250px;
  top: 145px;
  right: 20px;
  bottom: 20px;
  overflow: auto;
  font-size: 12px;
  border-left: 1px solid var(--border-color);
  border-right: 0;
  --border-color: #eee;
  --toolbar-icon-hover-color: #4285f4;
  --textarea-text-color: #616161;
  --hover-background-color: #f6f8fa;
  max-height: calc(100vh - 220px);
  // position: absolute;
  display:block;
  // right: 20px;
  // border-left: solid 1px #dadada;
}
#preview {
    padding-right: 280px;
    padding-left: 20%;
    flex: 1;
    min-width: 1px;
    overflow: auto;
    margin-left: -1px;
    border-left: 1px solid var(--border-color);
    box-sizing: border-box;
    border-radius: 0 0 3px 0;
    background-color: var(--textarea-background-color);
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
</style>
