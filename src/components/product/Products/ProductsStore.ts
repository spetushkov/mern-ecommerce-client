import { ReducerAction } from '../../../store/reducer/ReducerAction';
import { ReducerActionCreator } from '../../../store/reducer/ReducerActionCreator';
import { ProductApiPageResponse } from '../ProductApi';

type Action = ReducerAction<ActionType, Payload>;
const action = ReducerActionCreator<ActionType, Payload | Error>();

type Payload = Pick<ProductApiPageResponse, 'data' | 'paginator'>;

type ActionType = 'PRODUCTS_LOAD' | 'PRODUCTS_SUCCESS' | 'PRODUCTS_FAIL';

export type ProductsState = {
  loading: boolean;
  data: Payload | null;
  error: Error | null;
};

const initialState: ProductsState = {
  loading: false,
  data: null,
  error: null,
};

const reducer = (state = initialState, action: Action): ProductsState => {
  const { type, payload } = action;

  switch (type) {
    case 'PRODUCTS_LOAD':
      return { ...state, loading: true, error: null };
    case 'PRODUCTS_SUCCESS':
      return { ...state, loading: false, error: null, data: payload as Payload };
    case 'PRODUCTS_FAIL':
      return { ...state, loading: false, error: payload as Error };
    default:
      return state;
  }
};

export const ProductsStore = {
  action,
  reducer,
};
