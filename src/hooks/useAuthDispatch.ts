import { AuthContextDispatch } from 'contexts/Auth';
import { useContext } from 'react';

const useAuthDispatch = () => {
  const context = useContext(AuthContextDispatch);

  if (!context) {
    throw new Error('Forgot to wrap component in AuthContext');
  }

  return context;
};

export default useAuthDispatch;
