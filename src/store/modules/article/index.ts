import { defineStore } from 'pinia';
import {
  getArticleStatistic,
  updateArticleStatistic,
  saveArticleContent
} from '@/api/article';
import { Modal } from '@opentiny/vue';
// import { setToken, clearToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { shallowRef } from 'vue';
import { ArticleState } from './types';

const articleStore = defineStore('article', {
  state: (): ArticleState => ({
    // Vditor编辑器
    editorRef: null,
    // 编辑保存按钮的切换
    show: true,
    // 显示编辑？登录且有权限显示，未登录不显示
    show_edit: false,
    // 知识库的整体信息
    showBookInfo: true,
    bookCategory: [],
    bookInfo: '',
    // 文章信息
    role: null,
    edit: false,
    id: 0,
    category: '',
    username: '',
    user_id: '',
    content: '',
    article_id: '',
    father_id:'',
    name: '',
    word_count: 0,
    create_person: '',
    update_person: '',
    read_time: 0,
    create_time: '',
    update_time: '',
    // 统计数据
    views: 0,
    likes: 0,
    collects: 0,
    comments: 0,
    is_like: false,
    is_collect: false
  }),
  getters: {
  },
  actions: {
    async saveArticle(tip='保存成功') {
      let data = {
        content: this.editorRef.getValue(),
        id: this.id,
      }
      let res: any = await saveArticleContent(data)
      Modal.message({
        status: 'success',
          message: tip || res.errMsg
        })
      this.setInfo(res.data)
    },
    setInfo(partial: Partial<ArticleState>) {
      this.$patch(partial);
    },
    // 获取点赞、收藏、浏览量
    async statistic(resourceId: number) {
      let res = await getArticleStatistic({id: resourceId})
      this.setInfo(res.data)
    },
    // 添加收藏并更新浏览量 | 收藏 | 点赞
    async updateStatistic(data: any) {
      await updateArticleStatistic(data)
      // 更新完重新获取点赞、收藏、浏览量
      this.statistic(this.id)
    }
  }
});

export default articleStore;
