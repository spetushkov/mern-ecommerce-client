import { ProductApiPageResponse } from '../../../api/ProductApi';
import { ReducerAction } from '../../../store/reducer/ReducerAction';
import { ReducerActionCreator } from '../../../store/reducer/ReducerActionCreator';
import { ReducerState } from '../../../store/reducer/ReducerState';

type Action = ReducerAction<ActionType, DataPayload>;
const action = ReducerActionCreator<ActionType, DataPayload | Error>();

type DataPayload = ProductApiPageResponse;
type ActionType = 'PRODUCTS_LOAD' | 'PRODUCTS_SUCCESS' | 'PRODUCTS_FAIL';

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
      return { ...state, loading: false, error: null, data: payload as DataPayload };
    case 'PRODUCTS_FAIL':
      return { ...state, loading: false, error: payload as Error };
    default:
      return state;
  }
};

export type ProductsState = ReducerState<DataPayload> & {};
export const ProductsStore = {
  action,
  reducer,
};
