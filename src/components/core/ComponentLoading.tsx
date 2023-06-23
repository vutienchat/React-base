import NProgress from 'nprogress';
import type { FC } from 'react';
import { useEffect } from 'react';

const ComponentLoading: FC = () => {
  useEffect(() => {
    NProgress.start();

    return (): void => {
      NProgress.done();
    };
  }, []);

  return null;
};

export default ComponentLoading;
