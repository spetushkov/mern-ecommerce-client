import { Product } from '../../shared/Product';
import { ReducerAction } from '../../store/reducer/ReducerAction';
import { ReducerAsyncActionType } from '../../store/reducer/ReducerAsyncActionType';
import { ReducerState } from '../../store/reducer/ReducerState';

const ActionType = {
  ...ReducerAsyncActionType,
};

type Payload = Product[];

type State = ReducerState<Payload> & {};

type Action = ReducerAction<keyof typeof ActionType, Payload>;

export const createAction = (type: keyof typeof ActionType, payload?: Payload): Action => {
  return { type, payload };
};

const initialState: State = {
  loading: false,
  data: null,
  error: null,
};

export const ProductListReducer = (state = initialState, action: Action): State => {
  const { type, payload } = action;

  switch (type) {
    case 'LOAD':
      return load(state);
    case 'SUCCESS':
      return success(state, payload as Payload);
    case 'FAIL':
      return fail(state, payload as Error);
    default:
      return state;
  }
};

const load = (state: State) => {
  return { ...state, loading: true, error: null };
};

const success = (state: State, payload: Payload) => {
  return { ...state, loading: false, error: null, data: payload };
};

const fail = (state: State, payload: Error) => {
  return { ...state, loading: false, error: payload };
};
