import { Dispatch } from 'redux';
import * as ProductApi from '../../api/ProductApi';
import { productList } from './Reducer';

export const findAll = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    await asyncAction(ProductApi.findAll)(dispatch);
  } catch (error) {
    Promise.reject(error);
  }
};

const asyncAction = (callback: () => Promise<ProductApi.ProductApiPageResponse>) => async (
  dispatch: Dispatch,
): Promise<void> => {
  try {
    dispatch(productList('LOAD'));

    const data = await callback();
    if (data.error) {
      dispatch(productList('FAIL', data.error));
      return;
    }

    dispatch(productList('SUCCESS', data));
  } catch (error) {
    dispatch(productList('FAIL', error));
  }
};
