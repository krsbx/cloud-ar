import { lazy } from 'react';

const routes = [
  {
    path: '/dashboard',
    component: lazy(() => import('views/dashboardPage/DashboardPage')),
    exact: true,
  },
  {
    path: '/marker',
    component: lazy(() => import('views/markerPage/MarkerPage')),
    exact: true,
  },
  {
    path: '/marker/create',
    component: lazy(() => import('views/markerPage/CreateMarkerPage')),
    exact: true,
  },
];

export default routes;
