import { ProductApiResponse } from '../../../api/ProductApi';
import { ReducerAction } from '../../../store/reducer/ReducerAction';
import { ReducerActionCreator } from '../../../store/reducer/ReducerActionCreator';
import { ReducerState } from '../../../store/reducer/ReducerState';

type Action = ReducerAction<ActionType, DataPayload>;
const action = ReducerActionCreator<ActionType, DataPayload | Error>();

type DataPayload = ProductApiResponse;
type ActionType = 'PRODUCT_LOAD' | 'PRODUCT_SUCCESS' | 'PRODUCT_FAIL';

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
      return { ...state, loading: false, error: null, data: payload as DataPayload };
    case 'PRODUCT_FAIL':
      return { ...state, loading: false, error: payload as Error };
    default:
      return state;
  }
};

export type ProductState = ReducerState<DataPayload> & {};
export const ProductStore = {
  action,
  reducer,
};