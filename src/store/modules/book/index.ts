import { defineStore } from 'pinia';
import {
  createBookSpace,
  getBookSpace,
  updateBookSpace,
  getTeamSpace,
  deleteBookSpace
} from '@/api/space';
import { Modal } from '@opentiny/vue';
import { BookState } from './types';

const bookStore = defineStore('book', {
  state: (): BookState => ({
    authDisabled: false,
    teamOptions: [],
    bookSpaceData: [],
    showDialog: false,
    flag: 'create', // post: 创建团队空间  patch: 编辑空团队间
    teamId: null,
    createData: {
      team: '',
      id: '',
      description: '',
      name: '',
      category: '',
      auth: null
    },
    btnSubmit: {
      loading: false,
      text: {
        true: '提交中',
        false: '确定'
      }
    }
  }),
  getters: {
    showCard: (state: BookState) => {
      return !(state.bookSpaceData.length === 0)
    }
  },
  actions: {
    async delBookSpace(data: any) {
      let response: any = await deleteBookSpace(data)
      Modal.message({
        status: 'success',
        message: response.errMsg,
      })
      this.getBookSpaceData()
    },
    async getBookSpaceData() {
      let res = await getBookSpace({teamId: this.teamId})
      this.bookSpaceData = res.data
    },
    async createBookSpaceData() {
      if (this.flag === 'create') {
        let response: any = await createBookSpace(this.createData)
        this.showDialog = false
        Modal.message({
          status: 'success',
          message: response.errMsg,
        })
      } else if (this.flag === 'update'){
        let response: any = await updateBookSpace(this.createData)
        this.showDialog = false
        Modal.message({
          status: 'success',
          message: response.errMsg,
        })
      }
    },
    async getTeamSpaceData() {
      let res = await getTeamSpace()
      let data = []
      for (let i=0; i<res.data.length; i+=1) {
        data.push({label: res.data[i].name, value: res.data[i].id})
      }
      this.teamOptions = data
    }
  }
});
export default bookStore;
