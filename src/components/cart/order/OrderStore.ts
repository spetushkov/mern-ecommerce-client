import { ReducerAction } from '../../../store/reducer/ReducerAction';
import { ReducerActionCreator } from '../../../store/reducer/ReducerActionCreator';
import { OrderApiPageResponse } from './OrderApi';
import { Order } from './type/Order';

type Action = ReducerAction<ActionType, Payload>;
const action = ReducerActionCreator<ActionType, Payload | Error>();

type Orders = Pick<OrderApiPageResponse, 'data' | 'paginator'>;
type Payload = Order | Orders;

type ActionType = 'ORDER_PENDING' | 'ORDER_FIND_ALL' | 'ORDER_SAVE' | 'ORDER_ERROR';

export type OrderState = {
  loading: boolean;
  data: {
    order: Order | null;
    orders: Orders | null;
  };
  error: Error | null;
};

const initialState: OrderState = {
  loading: false,
  data: {
    order: null,
    orders: null,
  },
  error: null,
};

const reducer = (state = initialState, action: Action): OrderState => {
  const { type, payload } = action;

  switch (type) {
    case 'ORDER_PENDING':
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
    case 'ORDER_SAVE':
      return {
        ...state,
        loading: false,
        error: null,
        data: {
          ...state.data,
          order: payload as Order,
        },
      };
    case 'ORDER_ERROR':
      return { ...state, loading: false, error: payload as Error };
    default:
      return state;
  }
};

export const OrderStore = {
  action,
  reducer,
};
