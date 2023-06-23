import Loadable from 'components/core/Loadable';
// import PrivateRoute from 'components/core/PrivateRoute';
import MainLayout from 'layouts/MainLayout';
import RouteError from 'pages/Error/RouteError';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import Configurations from './Configurations';

// General
const Overview = Loadable(lazy(() => import('pages/General/Overview')));
const Analytics = Loadable(lazy(() => import('pages/General/Analytics')));
const Finance = Loadable(lazy(() => import('pages/General/Finance')));
const Logistics = Loadable(lazy(() => import('pages/General/Logistics')));
const Account = Loadable(lazy(() => import('pages/General/Account')));

// Wrap MainLayout with PrivateRoute to enable authentication
const Main: RouteObject = {
  path: '/',
  element: (
    <>
      <MainLayout />
    </>
  ),
  errorElement: <RouteError />,
  children: [
    {
      errorElement: <RouteError />,
      children: [
        { index: true, element: <Overview /> },
        { path: '/analytics', element: <Analytics /> },
        { path: '/finance', element: <Finance /> },
        { path: '/logistics', element: <Logistics /> },
        { path: '/account', element: <Account /> },
        Configurations,
      ],
    },
  ],
};

export default Main;
