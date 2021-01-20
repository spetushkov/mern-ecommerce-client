import { ReducerAction } from '../../store/reducer/ReducerAction';
import { ReducerActionCreator } from '../../store/reducer/ReducerActionCreator';
import { AuthStorage } from './AuthStorage';
import { AuthData } from './type/AuthData';

type Action = ReducerAction<ActionType, Payload>;
const action = ReducerActionCreator<ActionType, Payload | Error>();

type Payload = AuthData;

type ActionType = 'AUTH_REQUEST' | 'SIGNUP' | 'SIGNIN' | 'SIGNOUT' | 'AUTH_ERROR';

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
    case 'AUTH_REQUEST':
      return { ...state, loading: true, error: null };
    case 'SIGNUP':
    case 'SIGNIN':
      return { ...state, loading: false, error: null, data: payload as AuthData };
    case 'SIGNOUT':
      return { ...state, loading: false, error: null, data: null };
    case 'AUTH_ERROR':
      return { ...state, loading: false, error: payload as Error };
    default:
      return state;
  }
};

export const AuthReducer = {
  action,
  reducer,
};
