<template>
  <div class="article-page">
    <div v-show="text.content" style="margin-bottom: 5px" class="article-header">
      <!-- 面包屑 -->
      <Breadcrumb :items="['menu.space', 'space.team.teamSpace', 'space.team.teamSpace']" />
      <div class="editor-button" >
        <div v-show="show">
          <tiny-button size="small" type="primary" style="margin-right: 5px" :reset-time="200" @click="click">编辑</tiny-button>
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
      <div v-show="show" id='outline'></div>
      <!-- 文章编辑区域 -->
      <!-- <div v-show="show" id='vditor'></div> -->
      <div v-show="!show" id='vditor'></div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { Modal, Button as TinyButton } from '@opentiny/vue';
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
const text = articleInfo.$state

const likes = ref<number>(0);
const views = ref<number>(0);
const action = ref<string>();
const editorRef = shallowRef()

const click = () => {
  show.value = !(show.value)
  editorRef.value = new Vditor('vditor', {
  // height: 'calc(100vh - 204px)',
  height: 'calc(100% - 140px)',

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
  }
})
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


// onMounted(() => {
// editorRef.value = new Vditor('vditor', {
//   // height: 'calc(100vh - 204px)',
//   height: 'calc(100% - 140px)',

//   width: '100%',
//   placeholder: '在此输入内容',
//   debugger: true,
//   mode: 'wysiwyg',
//   outline: {
//     enable: true,
//     position: "left"
//   },
//   counter: {
//     enable: true
//   },
//   comment: {
//     enable: true
//   },
//   cache: {
//     enable: true
//   },
//   resize: {
//     enable: false,
//     position: 'bottom'
//   },
//   fullscreen: {
//     index: 9999999
//   }
// })
// 编辑器实例，必须用 shallowRef
const previewElement = document.getElementById('preview')
const outlineElement = document.getElementById('outline')

// watch(
//   text, // 注意这里变化
//   (val,old) => {
//     if (editorRef.value) {
//       console.log(editorRef.value)
//       if (!show.value) {
//         show.value = !show.value
//       }
//       editorRef.value.setValue(val.content)
//     }
//     Vditor.preview(previewElement, val.content, {
//     anchor: 1,
//     after(){
//       Vditor.outlineRender(previewElement, outlineElement)
//     }
//     })
//   }
// )
// })


let show = ref(true)
const state = reactive({
  text: '',
  theme: 'vuepress',
  id: 'my-editor'
});

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
// #vditor {
//   height: calc(100% - 140px);
// }
:deep(.svgs-icon:hover) {
  transform: scale(1.5, 1.5);
}
.editor-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px
}
.article-content {
  position: relative;
  overflow: auto;
  height: calc(100vh - 64px);
}
.article-page {
  position: relative;
  padding: 0  0 28px 28px;
  height: 100%;
}
#outline {
  position: absolute;
  display:block;
  top: 130px;
  right: 20px;
  border-left: solid 1px #dadada;
  /* bottom: 30px */
}
#preview {
  padding: 0 20%;
  text-align: left;
  height: calc(100% - 140px);
  overflow: auto;
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
