import { defineStore } from 'pinia';
import {
  getPersonalBasic, getPersonalData
} from '@/api/personal';
import { PersonalState } from './types';

const usePersonalStore = defineStore('personal', {
  state: (): PersonalState => ({
    avatar: '',
    username: 'admin',
    job: 'Front end',
    email: '',
    address: '',
    description: '',
    total: 0,
    data: []
  }),
  getters: {
  },
  actions: {
    setInfo(partial: Partial<PersonalState>) {
      this.$patch(partial);
    },
    async personalData(data: any) {
      let res = await getPersonalData(data)
      this.setInfo(res.data)
    },
    async personalBasic(data: any) {
      let res = await getPersonalBasic(data)
      this.setInfo(res.data)
    }
  }
})
export default usePersonalStore;
