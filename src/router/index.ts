import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../pages/home.vue';

export const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
    meta: {
      label: '首页',
    },
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('../pages/login.vue'),
    meta: {
      label: '登录',
    },
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: () => import('../pages/dashboard.vue'),
    meta: {
      label: '看板',
    },
  },
];

// 动态控制的路由
const dynamicRoutes = [
  {
    name: 'About',
    path: '/about',
    component: () => import('../pages/about.vue'),
    meta: {
      label: '关于',
      roles: ['admin', 'user'],
    },
  },
  {
    name: 'User',
    path: '/user',
    component: () => import('../pages/user.vue'),
    meta: {
      label: '用户',
      roles: ['admin', 'user'],
    },
    children: [
      {
        path: 'info',
        name: 'UserInfo',
        component: () => import('../pages/user-info.vue'),
        meta: {
          label: '个人信息',
          roles: ['admin', 'user'],
        },
        children: [
          {
            path: 'a',
            name: 'UserInfoA',
            component: () => import('../pages/user-info-a.vue'),
            meta: {
              label: 'UserInfoA',
              roles: ['admin', 'user'],
            },
          },
          {
            path: 'b',
            name: 'UserInfoB',
            component: () => import('../pages/user-info-b.vue'),
            meta: {
              label: 'UserInfoB',
              roles: ['admin'],
            },
          },
        ],
      },
      {
        path: 'orders',
        name: 'UserOrders',
        component: () => import('../pages/user-orders.vue'),
        meta: {
          label: '我的订单',
          roles: ['user'],
        },
      },
    ],
  },
  {
    name: 'List',
    path: '/list',
    component: () => import('../pages/list.vue'),
    meta: {
      label: '列表',
      roles: ['user'],
    },
  },
];

// hasRoute 判断是否存在 https://router.vuejs.org/zh/api/#hasroute
// addRoute 添加 https://router.vuejs.org/zh/api/#addroute

//
/**
 * 循环路由数据，转换为一个一维数组
 * @param data    路由数据
 * @param router  路由对象
 * @param role    角色
 * @returns
 */
export const loopRoutes = (router: any, role = '') => {
  const result: any = [];

  const loopChildren = (children: any, parent: string = '') => {
    children.forEach((item: any) => {
      if (item.children) {
        const { children, ...rest } = item;
        if (!rest.meta?.roles || rest.meta?.roles?.includes(role)) {
          result.push(rest);
          // 添加路由的时候需要加上判断是否已经存在
          if (!router.hasRoute(item.name)) {
            if (parent) {
              router.addRoute(parent, rest);
            } else {
              router.addRoute(rest);
            }
          }
        }
        loopChildren(children, rest.name);
      } else {
        if (!item.meta?.roles || item.meta?.roles?.includes(role)) {
          result.push(item);
          if (!router.hasRoute(item.name)) {
            if (parent) {
              router.addRoute(parent, item);
            } else {
              router.addRoute(item);
            }
          }
        }
      }
    });
  };

  loopChildren(dynamicRoutes);

  return [...routes, ...result].filter((item) => item.name !== 'Login');
};

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
