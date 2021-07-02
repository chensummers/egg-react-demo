import React,{lazy} from 'react';

const routes = [
  
  {
    path:'/',
    exact: true,
    name:'我的',
    component:lazy(() => import('@/pages/my')),
  },
  {
    path:'/login',
    exact: true,
    name:'登录',
    component:lazy(() => import('@/pages/login')),
  },
  {
    path:'/my',
    redirectTo:'/',
  },
  {
    path:'/diary',
    exact: true,
    name:'/日记',
    component:lazy(() => import('@/pages/diary')),
  },
  {
    path:'/diary/detail',
    name:'日记详情',
    component:lazy(() => import('@/pages/diary/detail')),
  },
  {
    path:'/diary/edit',
    name:'编辑日记',
    exact: true,
    component:lazy(() => import('@/pages/diary/edit')),
  }
];

export default routes;