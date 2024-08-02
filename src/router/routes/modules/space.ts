import { RoleType } from '@/types/roleType';

export default {
  path: 'space',
  name: 'Space',
  id: 'Space',
  label: 'Space',
  component: () => import('@/views/space/index.vue'),
  meta: {
    locale: 'menu.space',
    requiresAuth: true,
    order: 1,
    roles: [RoleType.admin],
  },
  children: [
    {
      path: 'team',
      name: 'Team',
      id: 'Team',
      label: 'Team',
      component: () => import('@/views/space/team/index.vue'),
      meta: {
        locale: 'menu.space.team',
        requiresAuth: true,
        roles: [RoleType.admin],
      },
    },
    {
      path: 'book',
      name: 'Book',
      id: 'Book',
      label: 'Book',
      component: () => import('@/views/space/book/index.vue'),
      meta: {
        locale: 'menu.space.book',
        requiresAuth: true,
        roles: [RoleType.admin],
      },
    }
  ],
};
