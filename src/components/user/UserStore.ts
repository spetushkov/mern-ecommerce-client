import { ReducerAction } from '../../store/reducer/ReducerAction';
import { ReducerActionCreator } from '../../store/reducer/ReducerActionCreator';
import { User } from './type/User';
import { UserApiPageResponse } from './UserApi';

type Action = ReducerAction<ActionType, Payload>;
const action = ReducerActionCreator<ActionType, Payload | Error>();

type Users = Pick<UserApiPageResponse, 'data' | 'paginator'>;
type Payload = User | Users;

type ActionType = 'USER_REQUEST' | 'USER_FIND_ALL' | 'USER_FIND_BY_ID' | 'USER_ERROR';

export type UserState = {
  loading: boolean;
  data: {
    user: User | null;
    users: Users | null;
  };
  error: Error | null;
};

const initialState: UserState = {
  loading: false,
  data: {
    user: null,
    users: null,
  },
  error: null,
};

const reducer = (state = initialState, action: Action): UserState => {
  const { type, payload } = action;

  switch (type) {
    case 'USER_REQUEST':
      return { ...state, loading: true, error: null };
    case 'USER_FIND_ALL':
      return {
        ...state,
        loading: false,
        error: null,
        data: {
          ...state.data,
          users: payload as Users,
        },
      };
    case 'USER_FIND_BY_ID':
      return {
        ...state,
        loading: false,
        error: null,
        data: {
          ...state.data,
          user: payload as User,
        },
      };
    case 'USER_ERROR':
      return { ...state, loading: false, error: payload as Error };
    default:
      return state;
  }
};

export const UserStore = {
  action,
  reducer,
};
