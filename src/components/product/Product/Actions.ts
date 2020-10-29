import { Dispatch } from 'redux';
import * as ProductApi from '../../../api/ProductApi';
import { productAction } from './Reducer';

export const findById = (id: string) => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(productAction('PRODUCT_LOAD'));

    const data = await ProductApi.findById(id);
    if (data.error) {
      dispatch(productAction('PRODUCT_FAIL', data.error));
      return;
    }

    dispatch(productAction('PRODUCT_SUCCESS', data));
  } catch (error) {
    dispatch(productAction('PRODUCT_FAIL', error));
  }
};
