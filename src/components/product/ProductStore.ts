import { ReducerAction } from '../../store/reducer/ReducerAction';
import { ReducerActionCreator } from '../../store/reducer/ReducerActionCreator';
import { ProductApiPageResponse } from './ProductApi';
import { Product } from './type/Product';

type Action = ReducerAction<ActionType, Payload>;
const action = ReducerActionCreator<ActionType, Payload | Error>();

type Products = Pick<ProductApiPageResponse, 'data' | 'paginator'>;
type ProductId = Pick<Product, 'id'>;
type Payload = Product | Products | ProductId;

type ActionType =
  | 'PRODUCT_REQUEST'
  | 'PRODUCT_FIND_ALL'
  | 'PRODUCT_FIND_TOP_RATAED'
  | 'PRODUCT_FIND_BY_ID'
  | 'PRODUCT_SAVE'
  | 'PRODUCT_UPDATE_BY_ID'
  | 'PRODUCT_DELETE_BY_ID'
  | 'PRODUCT_SAVE_REVIEW'
  | 'PRODUCT_RESET_PRODUCT'
  | 'PRODUCT_ERROR';

export type ProductState = {
  loading: boolean;
  data: {
    product: Product | null;
    products: Products | null;
    productsTopRated: Products | null;
    review: boolean;
  };
  error: Error | null;
};

const initialState: ProductState = {
  loading: false,
  data: {
    product: null,
    products: null,
    productsTopRated: null,
    review: false,
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
    case 'PRODUCT_FIND_TOP_RATAED':
      return {
        ...state,
        loading: false,
        error: null,
        data: {
          ...state.data,
          productsTopRated: payload as Products,
        },
      };
    case 'PRODUCT_FIND_BY_ID':
    case 'PRODUCT_SAVE':
    case 'PRODUCT_UPDATE_BY_ID':
      return {
        ...state,
        loading: false,
        error: null,
        data: {
          ...state.data,
          product: payload as Product,
        },
      };
    case 'PRODUCT_DELETE_BY_ID':
      return deleteById(state, payload as ProductId);

    case 'PRODUCT_SAVE_REVIEW':
      return {
        ...state,
        loading: false,
        error: null,
        data: {
          ...state.data,
          review: true,
        },
      };
    case 'PRODUCT_RESET_PRODUCT':
      return {
        ...state,
        loading: false,
        error: null,
        data: {
          ...state.data,
          product: null,
          productsTopRated: null,
          review: false,
        },
      };
    case 'PRODUCT_ERROR':
      return { ...state, loading: false, error: payload as Error };
    default:
      return state;
  }
};

const deleteById = (state: ProductState, payload: ProductId): ProductState => {
  if (!state.data.products) {
    return state;
  }

  const productsDataUpdated = state.data.products.data.filter(
    (product) => product.id !== payload.id,
  );

  return {
    ...state,
    loading: false,
    error: null,
    data: {
      ...state.data,
      products: {
        ...state.data.products,
        data: productsDataUpdated,
      },
    },
  };
};

export const ProductStore = {
  action,
  reducer,
};
