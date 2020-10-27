import { Dispatch } from 'redux';
import * as ProductApi from '../../api/ProductApi';
import { createAction } from './Reducer';

export const getProducts = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(createAction('LOAD'));

    const data = await ProductApi.getProducts();
    dispatch(createAction('SUCCESS', data));
  } catch (error) {
    dispatch(createAction('FAIL', error));
  }
};
