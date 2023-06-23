import type { RouteObject } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const Fallback: RouteObject = {
  path: '*',
  element: <Outlet />,
  children: [
    { index: true, element: <div>Not Found</div> },
    { path: '*', element: <div>Not Found</div> },
  ],
};

export default Fallback;
