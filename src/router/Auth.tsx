import Loadable from 'components/core/Loadable';
import PublicRoute from 'components/core/PublicRoute';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';

// Auth
const Login = Loadable(lazy(() => import('pages/Auth/Login')));
const Register = Loadable(lazy(() => import('pages/Auth/Register')));

const Auth: RouteObject = {
  path: 'auth',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <Navigate to="login" />,
    },
    {
      path: 'login',
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: 'register',
      element: <Register />,
    },
  ],
};

export default Auth;
