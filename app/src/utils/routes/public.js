import { lazy } from 'react';

const routes = [
  {
    path: '/',
    component: lazy(() => import('views/homePage/HomePage')),
    exact: true,
  },
  {
    path: '/login',
    component: lazy(() => import('views/loginPage/LoginPage')),
    exact: true,
  },
  {
    path: '/register',
    component: lazy(() => import('views/registerPage/RegisterPage')),
    exact: true,
  },
];

export default routes;
