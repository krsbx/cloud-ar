import { lazy } from 'react';
import { IRoutes } from './routesInterface';

const routes: IRoutes[] = [
  {
    path: '/dashboard',
    component: lazy(() => import('views/dashboardPage/DashboardPage')),
  },
  {
    path: '/marker',
    component: lazy(() => import('views/markerPage/MarkerPage')),
  },
  {
    path: '/marker/create',
    component: lazy(() => import('views/markerPage/CreateMarkerPage')),
  },
];

export default routes;
