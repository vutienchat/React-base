import { __DEV__ } from 'config';
import useRefresh from 'hooks/useRefresh';
import type { Dispatch } from 'react';
import { createContext, useEffect, useReducer } from 'react';
import { getUser, signIn, signOut } from 'services/auth';
import type { User } from 'types/profile';
import type { FCC } from 'types/react';
import LocalStorage from 'utils/LocalStorage';
import Logger from 'utils/Logger';

type Login = typeof signIn;
type Logout = typeof signOut;
type Register = () => Promise<void>;

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

export interface AuthContextStateValue extends State {
  login: Login;
  logout: Logout;
  register: Register;
}

type Action =
  | { type: 'AUTHORIZED'; payload: { user: User | null } }
  | { type: 'UNAUTHORIZED' }
  | { type: 'LOGOUT' };

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'AUTHORIZED': {
      const { user } = action.payload;
      return {
        isInitialized: true,
        isAuthenticated: true,
        user,
      };
    }
    case 'UNAUTHORIZED': {
      return {
        isInitialized: true,
        isAuthenticated: false,
        user: null,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    default:
      return state;
  }
};

const AuthContextState = createContext<AuthContextStateValue | null>(null);
const AuthContextDispatch = createContext<Dispatch<Action> | null>(null);

if (__DEV__) {
  AuthContextState.displayName = 'AuthContext';
}

const AuthProvider: FCC = (props) => {
  const { children } = props;
  const [refresh, refetch] = useRefresh();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const accessToken = LocalStorage.get('accessToken');

    if (accessToken) {
      getUser()
        .then((response) => {
          const { data: user } = response;
          if (user) {
            dispatch({ type: 'AUTHORIZED', payload: { user } });
          } else {
            dispatch({ type: 'UNAUTHORIZED' });
          }
        })
        .catch((error) => {
          Logger.log(error);
          dispatch({ type: 'UNAUTHORIZED' });
        });
    } else {
      dispatch({ type: 'UNAUTHORIZED' });
    }
  }, [refresh]);

  const login: Login = async (params) => {
    const response = await signIn(params);

    const { accessToken, refreshToken, userId } = response;

    if (accessToken && refreshToken && userId) {
      LocalStorage.set('accessToken', accessToken);
      LocalStorage.set('refreshToken', refreshToken);
      LocalStorage.set('uid', userId);

      refetch();
    }

    return response;
  };

  const logout: Logout = async () => {
    const response = await signOut();
    LocalStorage.clear();

    dispatch({ type: 'LOGOUT' });

    return response;
  };

  const register: Register = async (): Promise<void> => {
    // Register
  };

  return (
    <AuthContextState.Provider value={{ ...state, login, logout, register }}>
      <AuthContextDispatch.Provider value={dispatch}>
        {children}
      </AuthContextDispatch.Provider>
    </AuthContextState.Provider>
  );
};

const AuthConsumer = AuthContextState.Consumer;
export {
  AuthContextState as default,
  AuthProvider,
  AuthConsumer,
  AuthContextDispatch,
};
