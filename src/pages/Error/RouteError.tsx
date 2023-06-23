import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import ErrorInner from './ErrorInner';

const RouteError = () => {
  const error = useRouteError();

  if (!isRouteErrorResponse(error)) {
    throw error;
  }

  const { status, statusText } = error;

  return <ErrorInner code={status} statusText={statusText} />;
};

export default RouteError;
