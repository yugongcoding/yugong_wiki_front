/* eslint-disable prefer-template */
import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import ManageLayout from '@/layout/manage-layout.vue';
import ArticleLayout from '@/layout/article-layout.vue';
import PersonalLayout from '@/layout/personal-home.vue';
import Home from '@/views/home/index.vue';
import Download from '@/views/home/download/index.vue';
import About from '@/views/home/about/index.vue';
import Main from '@/views/home/main/index.vue';


import Test from '@/views/test/index.vue';


import appRoutes from './routes';
import createRouteGuard from './guard';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
        behavior: 'smooth',
      }
    }
    return {
      selector: to.hash,
      behavior: 'smooth',
    }
  },
  routes: [
    {
      path: '/personal/:username/:user_id',
      name: 'personal',
      component: PersonalLayout,
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    // 本地地址
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/main',
      children: [
        {
          path: 'main',
          name: 'main',
          component: Main,
        },
        {
          path: 'download',
          name: 'download',
          component: Download,
        },
        {
          path: 'about',
          name: 'about',
          component: About,
        },
      ]
    },
    {
      path: import.meta.env.VITE_CONTEXT + 'login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      name: 'root',
      path: import.meta.env.VITE_CONTEXT,
      component: ManageLayout,
      children: appRoutes,
    },
    {
      name: 'article',
      path: '/article',
      component: ArticleLayout,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: import.meta.env.VITE_CONTEXT + ':pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/not-found/index.vue'),
    },
    {
      path: import.meta.env.VITE_CONTEXT + 'preview',
      name: 'preview',
      component: () => import('@/views/Preview/index.vue'),
    }
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

createRouteGuard(router);

export default router;
