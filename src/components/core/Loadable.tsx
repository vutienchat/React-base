import { lazy, Suspense } from 'react';
import ComponentLoading from './ComponentLoading';

interface Props {
  [key: string]: any;
}

type LazyComponent = ReturnType<typeof lazy>;

const Loadable = (Component: LazyComponent) => {
  return (props: Props) => {
    return (
      <Suspense fallback={<ComponentLoading />}>
        <Component {...props} />
      </Suspense>
    );
  };
};

export default Loadable;
