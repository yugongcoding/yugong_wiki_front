import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useTabBarStore from './modules/tab-bar';
import articleStore from './modules/article';
import teamStore from './modules/team';
import bookStore from './modules/book';
import usePersonalStore from './modules/personal';
import useMobileStore from './modules/mobile';


const pinia = createPinia();

export { useAppStore, useUserStore, useTabBarStore, articleStore, teamStore, bookStore, usePersonalStore, useMobileStore };
export default pinia;
