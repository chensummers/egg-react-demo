import React,{lazy} from 'react';

const routes = [
  
  {
    path:'/',
    exact: true,
    name:'我的',
    component:lazy(() => import('@/pages/my')),
  },
  {
    path:'/my',
    redirectTo:'/',
  },
  {
    path:'/diary',
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
    component:lazy(() => import('@/pages/diary/edit')),
  }
];

export default routes;