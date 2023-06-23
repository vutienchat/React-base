import isEqual from 'lodash.isequal';
import { useEffect, useState } from 'react';
import { usePrevious } from 'react-use';

const useDerivedState = <T>(initialState: T | (() => T)) => {
  const computedState =
    initialState instanceof Function ? initialState() : initialState;

  const [state, setState] = useState<T>(computedState);

  const prevState = usePrevious<T>(computedState);

  useEffect(() => {
    if (!isEqual(computedState, prevState)) {
      setState(computedState);
    }
  }, [computedState, prevState]);

  return [state, setState] as const;
};

export default useDerivedState;
