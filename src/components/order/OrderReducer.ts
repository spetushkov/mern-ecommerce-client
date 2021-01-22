import { ReducerAction } from '../../store/reducer/ReducerAction';
import { ReducerActionCreator } from '../../store/reducer/ReducerActionCreator';
import { Config } from '../config/type/Config';
import { OrderApiPageResponse } from './OrderApi';
import { Order } from './type/Order';

type Action = ReducerAction<ActionType, Payload>;
const action = ReducerActionCreator<ActionType, Payload | Error>();

type Orders = Pick<OrderApiPageResponse, 'data' | 'paginator'>;
type Payload = Order | Orders | Config;

type ActionType =
  | 'ORDER_REQUEST'
  | 'ORDER_FIND_ALL'
  | 'ORDER_FIND_BY_ID'
  | 'ORDER_SAVE'
  | 'ORDER_UPDATE_BY_ID'
  | 'ORDER_PAY'
  | 'ORDER_CONFIG_FIND_BY_ID'
  | 'ORDER_RESET'
  | 'ORDER_ERROR';

export type OrderState = {
  loading: boolean;
  data: {
    order: Order | null;
    orders: Orders | null;
    config: Config | null;
  };
  error: Error | null;
};

const initialState: OrderState = {
  loading: false,
  data: {
    order: null,
    orders: null,
    config: null,
  },
  error: null,
};

const reducer = (state = initialState, action: Action): OrderState => {
  const { type, payload } = action;

  switch (type) {
    case 'ORDER_REQUEST':
      return { ...state, loading: true, error: null };
    case 'ORDER_FIND_ALL':
      return {
        ...state,
        loading: false,
        error: null,
        data: {
          ...state.data,
          orders: payload as Orders,
        },
      };
    case 'ORDER_FIND_BY_ID':
    case 'ORDER_SAVE':
    case 'ORDER_UPDATE_BY_ID':
    case 'ORDER_PAY':
      return {
        ...state,
        loading: false,
        error: null,
        data: {
          ...state.data,
          order: payload as Order,
        },
      };
    case 'ORDER_CONFIG_FIND_BY_ID':
      return {
        ...state,
        loading: false,
        error: null,
        data: {
          ...state.data,
          config: payload as Config,
        },
      };
    case 'ORDER_RESET':
      return initialState;
    case 'ORDER_ERROR':
      return { ...state, loading: false, error: payload as Error };
    default:
      return state;
  }
};

export const OrderReducer = {
  action,
  reducer,
};
