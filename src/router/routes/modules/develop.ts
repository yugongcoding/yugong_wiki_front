import { RoleType } from '@/types/roleType';

export default {
  path: 'develop',
  name: 'develop',
  id: 'Develop',
  label: 'Develop',
  component: () => import('@/views/develop/index.vue'),
  meta: {
    locale: 'menu.space',
    requiresAuth: true,
    order: 1,
    roles: [RoleType.admin],
  },
  children: [
    {
      path: 'log',
      name: 'Log',
      id: 'Log',
      label: 'Log',
      component: () => import('@/views/develop/log.vue'),
      meta: {
        locale: 'menu.space.team',
        requiresAuth: true,
        roles: [RoleType.admin],
      },
    }
  ],
};
