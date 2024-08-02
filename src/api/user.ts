import axios from 'axios';
import { UserInfo } from '@/store/modules/user/types';

export interface LoginData {
  username: string;
  password: string;
  email: string;
  code: string;
}

export interface LoginDataMail {
  mailname: string;
  mailpassword: string;
}

export interface LoginRes {
  token: string;
  userInfo: UserInfo;
}
export interface UserRes {
  loginStatus: boolean;
}

export interface loginStatusRes {
  loginStatus: boolean;
}
export interface UserData {
  flag: any
}
export function loginStatus() {
  return axios.get<loginStatusRes>('/api/user/loginStatus');
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/user/login', data);
}
export function loginMail(data: LoginDataMail) {
  return axios.post<LoginRes>('/api/mail/login', data);
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return axios.get<UserInfo>(`/api/user/userInfo`);
}

export function updateUserInfo(data: UserInfo) {
  return axios.patch<UserInfo>(`/api/user/userInfo`, data);
}

export function updateUserAvatar(data: UserInfo) {
  return axios.patch<UserInfo>(`/api/user/userAvatar`, data);
}

export function getUserData(data?: UserData) {
  return axios.get<UserRes>('/api/user/data', {params: data});
}

export function registerUser(data: LoginData) {
  return axios.post<UserInfo>('/api/user/register', data);
}

export interface VerifyCodeData {
  email: any
}
export function getVerifyCode(data: VerifyCodeData) {
  return axios.post('/api/user/verifyCode', data);
}

export interface ForgetPasswordData {
  email: string,
  code: string,
  password: string
}
export function forgetPassword(data: ForgetPasswordData) {
  return axios.post('/api/user/forgetPassword', data);
}
