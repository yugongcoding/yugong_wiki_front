import axios from 'axios';


// 获取团队空间数据
export interface TeamData {
  name: string;
  category: string;
  description: string;
}

export function createTeamSpace(data: TeamData) {
  return axios.post('/api/space/teamSpace', data);
}

export function getTeamSpace() {
  return axios.get('/api/space/teamSpace');
}

export function updateTeamSpace(data: TeamData) {
  return axios.patch('/api/space/teamSpace', data);
}

export interface DeleteTeamData {
  teamId: number
}

export function deleteTeamSpace(params: DeleteTeamData) {
  return axios.delete('/api/space/teamSpace', {data: params})
}

// 获取知识空间数据
export interface BookData {
  name: string;
  category: string;
  description: string;
  teamId: any
}

export function createBookSpace(data: TeamData) {
  return axios.post('/api/space/bookSpace', data);
}

export function getBookSpace(data: any) {
  return axios.get('/api/space/bookSpace', {params: data});
}

export function updateBookSpace(data: TeamData) {
  return axios.patch('/api/space/bookSpace', data);
}
export interface DeleteBookData {
  bookId: number
}
export function deleteBookSpace(params: DeleteBookData) {
  return axios.delete('/api/space/bookSpace', {data: params});
}


export interface AuthOptions {
  resourceType: string,
  id: number
}
export function getAuthOptions(data: AuthOptions) {
  return axios.get('/api/space/authOptions', {params: data});
}


export interface InviteUserData {
  email: string,
  role: string
}
export function inviteUser(data: InviteUserData) {
  return axios.post('/api/space/inviteUser', data);
}
