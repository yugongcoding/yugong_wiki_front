import { loginStatus } from "@/api/user";

const TOKEN_KEY = 'token';

const isLogin = async () => {
  const res = await loginStatus();
  return !!res.data.loginStatus;
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export { isLogin, getToken, setToken, clearToken };
