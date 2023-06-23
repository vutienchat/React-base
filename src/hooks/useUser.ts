import AuthContextState from 'contexts/Auth';
import { useContext } from 'react';

const useUser = () => {
  const context = useContext(AuthContextState);

  if (!context) {
    throw new Error('Forgot to wrap component in AuthContext');
  }

  const { user } = context;

  if (!user) {
    throw new Error('Unauthorized');
  }

  return user;
};

export default useUser;
