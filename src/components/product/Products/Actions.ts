import { Dispatch } from 'redux';
import * as ProductApi from '../../../api/ProductApi';
import { productsAction } from './Reducer';

export const findAll = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(productsAction('PRODUCTS_LOAD'));

    const data = await ProductApi.findAll();
    if (data.error) {
      dispatch(productsAction('PRODUCTS_FAIL', data.error));
      return;
    }

    dispatch(productsAction('PRODUCTS_SUCCESS', data));
  } catch (error) {
    dispatch(productsAction('PRODUCTS_FAIL', error));
  }
};
