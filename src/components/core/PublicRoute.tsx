import { DEFAULT_PAGE } from 'constants/routes';
import useAuthDispatch from 'hooks/useAuthDispatch';
import useAuthState from 'hooks/useAuthState';
import { Fragment, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import type { FCC } from 'types/react';

const PublicRoute: FCC = (props) => {
  const { children } = props;
  const { state } = useLocation();
  const { isAuthenticated } = useAuthState();
  const dispatch = useAuthDispatch();

  // Send them back to the page they tried to visit when they were
  // redirected to the login page. Use { replace: true } so we don't create
  // another entry in the history stack for the login page. This means that
  // when they get to the protected page and click the back button, they
  // won't end up back on the login page, which is also really nice for the
  // user experience.
  const to = state?.from || DEFAULT_PAGE;

  // Reset the authentication context when the user doesn't trigger the logout action.
  // That means this logout action can come from outside React, (HttpClient,...).
  const reset = state?.reset;

  useEffect(() => {
    if (reset) {
      dispatch({ type: 'UNAUTHORIZED' });
    }
  }, [reset, dispatch]);

  if (isAuthenticated) {
    return <Navigate to={to} replace />;
  }

  return <Fragment>{children}</Fragment>;
};

export default PublicRoute;
