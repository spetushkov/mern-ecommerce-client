import { ReducerAction } from '../../store/reducer/ReducerAction';
import { ReducerActionCreator } from '../../store/reducer/ReducerActionCreator';
import { ReducerState } from '../../store/reducer/ReducerState';
import { AuthApiResponse } from './AuthApi';

type Action = ReducerAction<ActionType, DataPayload>;
const action = ReducerActionCreator<ActionType, DataPayload | Error>();

type DataPayload = AuthApiResponse;
type ActionType = 'AUTH_LOAD' | 'AUTH_SUCCESS' | 'AUTH_FAIL' | 'SIGNOUT_SUCCESS';

export type AuthState = ReducerState<DataPayload> & {};

const initialState: AuthState = {
  loading: false,
  data: null,
  error: null,
};

const reducer = (state = initialState, action: Action): AuthState => {
  const { type, payload } = action;

  switch (type) {
    case 'AUTH_LOAD':
      return { ...state, loading: true, error: null };
    case 'AUTH_SUCCESS':
      return { ...state, loading: false, error: null, data: payload as DataPayload };
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
