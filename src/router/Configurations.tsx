import Loadable from 'components/core/Loadable';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

// Configurations
const Employees = Loadable(lazy(() => import('pages/Configurations/Organisation/Employees')));
const Company = Loadable(lazy(() => import('pages/Configurations/Organisation/Company')));
const RolesPermissions = Loadable(lazy(() => import('pages/Configurations/Security/RolesPermissions')));
const Authentication = Loadable(lazy(() => import('pages/Configurations/Security/Authentication')));
const Logs = Loadable(lazy(() => import('pages/Configurations/Security/Logs')));
const Notifications = Loadable(lazy(() => import('pages/Configurations/Notifications')));

const Configurations: RouteObject = {
  path: 'configurations',
  element: <Outlet />,
  children: [
    {
      path: 'organisation',
      element: <Outlet />,
      children: [
        { path: 'employees', element: <Employees /> },
        { path: 'company', element: <Company /> },
      ],
    },
    {
      path: 'security',
      element: <Outlet />,
      children: [
        { path: 'roles-ermissions', element: <RolesPermissions /> },
        { path: 'authentication', element: <Authentication /> },
        { path: 'logs', element: <Logs /> },
      ],
    },
    {
      path: 'notifications',
      element: <Notifications />,
    },
  ],
};

export default Configurations;
