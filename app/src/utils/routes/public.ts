import { lazy } from 'react';
import { IRoutes } from './routesInterface';

const routes: IRoutes[] = [
  {
    path: '/',
    component: lazy(() => import('views/homePage/HomePage')),
  },
  {
    path: '/login',
    component: lazy(() => import('views/loginPage/LoginPage')),
  },
  {
    path: '/register',
    component: lazy(() => import('views/registerPage/RegisterPage')),
  },
];

export default routes;
