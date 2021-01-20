import { ReducerAction } from '../../store/reducer/ReducerAction';
import { ReducerActionCreator } from '../../store/reducer/ReducerActionCreator';
import { User } from './type/User';
import { UserApiPageResponse } from './UserApi';

type Action = ReducerAction<ActionType, Payload>;
const action = ReducerActionCreator<ActionType, Payload | Error>();

type Users = Pick<UserApiPageResponse, 'data' | 'paginator'>;
type UserId = Pick<User, 'id'>;
type Payload = User | Users | UserId;

type ActionType =
  | 'USER_REQUEST'
  | 'USER_FIND_ALL'
  | 'USER_FIND_BY_ID'
  | 'USER_UPDATE_BY_ID'
  | 'USER_DELETE_BY_ID'
  | 'USER_RESET'
  | 'USER_ERROR';

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
    case 'USER_UPDATE_BY_ID':
      return {
        ...state,
        loading: false,
        error: null,
        data: {
          ...state.data,
          user: payload as User,
        },
      };
    case 'USER_DELETE_BY_ID':
      return deleteById(state, payload as UserId);
    case 'USER_RESET':
      return initialState;
    case 'USER_ERROR':
      return { ...state, loading: false, error: payload as Error };
    default:
      return state;
  }
};

const deleteById = (state: UserState, payload: UserId): UserState => {
  if (!state.data.users) {
    return state;
  }

  const usersDataUpdated = state.data.users.data.filter((user) => user.id !== payload.id);

  return {
    ...state,
    loading: false,
    error: null,
    data: {
      ...state.data,
      users: {
        ...state.data.users,
        data: usersDataUpdated,
      },
    },
  };
};

export const UserReducer = {
  action,
  reducer,
};
