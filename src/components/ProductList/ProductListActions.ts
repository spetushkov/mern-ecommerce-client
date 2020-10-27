import { Dispatch } from 'redux';
import * as api from '../../api/RestApi';
import { createAction } from './ProductListReducer';

export const getProducts = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(createAction('LOAD'));

    const data = await api.getProducts();
    dispatch(createAction('SUCCESS', data));
  } catch (error) {
    dispatch(createAction('FAIL', error));
  }
};
