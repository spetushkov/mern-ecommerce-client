import { ReducerAction } from '../../store/reducer/ReducerAction';
import { ReducerActionCreator } from '../../store/reducer/ReducerActionCreator';
import { ProductApiPageResponse } from './ProductApi';
import { Product } from './type/Product';

type Action = ReducerAction<ActionType, Payload>;
const action = ReducerActionCreator<ActionType, Payload | Error>();

type Products = Pick<ProductApiPageResponse, 'data' | 'paginator'>;
type Payload = Product | Products;

type ActionType = 'PRODUCT_REQUEST' | 'PRODUCT_FIND_ALL' | 'PRODUCT_FIND_BY_ID' | 'PRODUCT_ERROR';

export type ProductState = {
  loading: boolean;
  data: {
    product: Product | null;
    products: Products | null;
  };
  error: Error | null;
};

const initialState: ProductState = {
  loading: false,
  data: {
    product: null,
    products: null,
  },
  error: null,
};

const reducer = (state = initialState, action: Action): ProductState => {
  const { type, payload } = action;

  switch (type) {
    case 'PRODUCT_REQUEST':
      return { ...state, loading: true, error: null };
    case 'PRODUCT_FIND_ALL':
      return {
        ...state,
        loading: false,
        error: null,
        data: {
          ...state.data,
          products: payload as Products,
        },
      };
    case 'PRODUCT_FIND_BY_ID':
      return {
        ...state,
        loading: false,
        error: null,
        data: {
          ...state.data,
          product: payload as Product,
        },
      };
    case 'PRODUCT_ERROR':
      return { ...state, loading: false, error: payload as Error };
    default:
      return state;
  }
};

export const ProductStore = {
  action,
  reducer,
};
