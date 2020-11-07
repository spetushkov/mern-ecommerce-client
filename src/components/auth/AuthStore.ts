import { AuthData } from '../../external/AuthData';
import { ReducerAction } from '../../store/reducer/ReducerAction';
import { ReducerActionCreator } from '../../store/reducer/ReducerActionCreator';
import { AuthStorage } from './AuthStorage';

type Action = ReducerAction<ActionType, Payload>;
const action = ReducerActionCreator<ActionType, Payload | Error>();

type Payload = AuthData;

type ActionType = 'AUTH_LOAD' | 'AUTH_SUCCESS' | 'AUTH_FAIL' | 'SIGNOUT_SUCCESS';

export type AuthState = {
  loading: boolean;
  data: AuthData | null;
  error: Error | null;
};

const authStorage = new AuthStorage();

const initialState: AuthState = {
  loading: false,
  data: authStorage.find(),
  error: null,
};

const reducer = (state = initialState, action: Action): AuthState => {
  const { type, payload } = action;

  switch (type) {
    case 'AUTH_LOAD':
      return { ...state, loading: true, error: null };
    case 'AUTH_SUCCESS':
      return { ...state, loading: false, error: null, data: payload as AuthData };
    case 'SIGNOUT_SUCCESS':
      return { ...state, loading: false, error: null, data: null };
    case 'AUTH_FAIL':
      return { ...state, loading: false, error: payload as Error };
    default:
      return state;
  }
};

export const AuthStore = {
  action,
  reducer,
};
