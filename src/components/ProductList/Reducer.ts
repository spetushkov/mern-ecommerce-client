import { ProductApiPageResponse } from '../../api/ProductApi';
import { ReducerAction } from '../../store/reducer/ReducerAction';
import { ReducerActionCreator } from '../../store/reducer/ReducerActionCreator';
import { ReducerAsyncActionType } from '../../store/reducer/ReducerAsyncActionType';
import { ReducerState } from '../../store/reducer/ReducerState';

type ActionType = keyof typeof actionTypes;
type Action = ReducerAction<ActionType, DataPayload>;
export const productList = ReducerActionCreator<ActionType, DataPayload | Error>();

type DataPayload = ProductApiPageResponse;
export type ProductListState = ReducerState<DataPayload> & {};
const actionTypes = { ...ReducerAsyncActionType };

const initialState: ProductListState = {
  loading: false,
  data: null,
  error: null,
};

export const ProductListReducer = (state = initialState, action: Action): ProductListState => {
  const { type, payload } = action;

  switch (type) {
    case 'LOAD':
      return { ...state, loading: true, error: null };
    case 'SUCCESS':
      return { ...state, loading: false, error: null, data: payload as DataPayload };
    case 'FAIL':
      return { ...state, loading: false, error: payload as Error };
    default:
      return state;
  }
};
