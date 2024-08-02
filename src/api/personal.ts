import axios from 'axios';


export interface PersonalBasic {
  userId: any
}

export interface PersonalData{
  userId: any,
  flag: any
}

export function getPersonalBasic(data: PersonalBasic) {
  return axios.get('/api/user/personal_basic', {params: data});
}

export function getPersonalData(data: PersonalData) {
  return axios.get('/api/user/personal_data', {params: data});
}



