import { Product } from '../../external/Product';
import { ReducerAction } from '../../store/reducer/ReducerAction';
import { ReducerActionCreator } from '../../store/reducer/ReducerActionCreator';

type Action = ReducerAction<ActionType, Payload>;
const action = ReducerActionCreator<ActionType, Payload | Error>();

type Payload = Product;

type ActionType = 'PRODUCT_LOAD' | 'PRODUCT_SUCCESS' | 'PRODUCT_FAIL';

export type ProductState = {
  loading: boolean;
  data: Product | null;
  error: Error | null;
};

const initialState: ProductState = {
  loading: false,
  data: null,
  error: null,
};

const reducer = (state = initialState, action: Action): ProductState => {
  const { type, payload } = action;

  switch (type) {
    case 'PRODUCT_LOAD':
      return { ...state, loading: true, error: null };
    case 'PRODUCT_SUCCESS':
      return { ...state, loading: false, error: null, data: payload as Product };
    case 'PRODUCT_FAIL':
      return { ...state, loading: false, error: payload as Error };
    default:
      return state;
  }
};

export const ProductStore = {
  action,
  reducer,
};
