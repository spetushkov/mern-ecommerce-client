import { Dispatch } from 'redux';
import { ProductApi } from '../../../api/ProductApi';
import { ProductStore } from './ProductStore';

const findById = (id: string) => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(ProductStore.action('PRODUCT_LOAD'));

    const data = await ProductApi.findById(id);
    if (data.error) {
      dispatch(ProductStore.action('PRODUCT_FAIL', data.error));
      return;
    }

    dispatch(ProductStore.action('PRODUCT_SUCCESS', data));
  } catch (error) {
    dispatch(ProductStore.action('PRODUCT_FAIL', error));
  }
};

export const ProductActions = {
  findById,
};
