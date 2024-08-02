import { defineStore } from 'pinia';
import {
  createTeamSpace,
  getTeamSpace,
  updateTeamSpace,
  deleteTeamSpace
} from '@/api/space';
import { Modal } from '@opentiny/vue';

import { TeamState, AddTeamSpaceData } from './types';


const teamStore = defineStore('team', {
  state: (): TeamState => ({
    inviteData: {
      email: '',
      role: '',
      teamId: ''
    },
    showInviteDialog: false,
    authDisabled: false,
    teamSpaceData: [],
    showDialog: false,
    flag: 'create', // post: 创建团队空间  patch: 编辑空团队间
    createData: {
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
    showCard: (state: TeamState) => {
      return !(state.teamSpaceData.length === 0)
    }
  },
  actions: {
    async delTeamSpace(data: any) {
      let response: any = await deleteTeamSpace(data)
      Modal.message({
        status: 'success',
        message: response.errMsg,
      })
      this.getTeamSpaceData()
    },
    async getTeamSpaceData() {
      let res = await getTeamSpace()
      this.teamSpaceData = res.data
    },
    async createTeamSpaceData() {
      if (this.flag === 'create') {
        let response: any = await createTeamSpace(this.createData)
        this.showDialog = false
        Modal.message({
          status: 'success',
          message: response.errMsg,
        })
      } else if (this.flag === 'update'){
        let response: any = await updateTeamSpace(this.createData)
        this.showDialog = false
        Modal.message({
          status: 'success',
          message: response.errMsg,
        })
      }

    },
    async editTeamSpaceData() {
      let res = await getTeamSpace()
      this.teamSpaceData = res.data
    }

  }
});

export default teamStore;
