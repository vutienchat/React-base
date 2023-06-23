import AuthContextState from 'contexts/Auth';
import { useContext } from 'react';

const useAuthState = () => {
  const context = useContext(AuthContextState);

  if (!context) {
    throw new Error('Forgot to wrap component in AuthContext');
  }

  return context;
};

export default useAuthState;
