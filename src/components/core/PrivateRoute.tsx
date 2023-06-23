import useAuthState from 'hooks/useAuthState';
import { Fragment } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import type { FCC } from 'types/react';
import SplashScreen from './SplashScreen';

const PrivateRoute: FCC = (props) => {
  const { children } = props;
  const { pathname } = useLocation();
  const { isAuthenticated, isInitialized } = useAuthState();

  if (!isInitialized) {
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    // Redirect them to the /auth/login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/auth/login" state={{ from: pathname }} replace />;
  }

  return <Fragment>{children}</Fragment>;
};

export default PrivateRoute;
