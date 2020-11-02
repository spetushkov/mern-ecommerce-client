import { Dispatch } from 'redux';
import { ProductApi } from '../ProductApi';
import { ProductsStore } from './ProductsStore';

const findAll = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(ProductsStore.action('PRODUCTS_LOAD'));

    const data = await ProductApi.findAll();
    if (data.error) {
      dispatch(ProductsStore.action('PRODUCTS_FAIL', data.error));
      return;
    }

    if (!data.data) {
      return;
    }

    dispatch(ProductsStore.action('PRODUCTS_SUCCESS', data));
  } catch (error) {
    dispatch(ProductsStore.action('PRODUCTS_FAIL', error));
  }
};

export const ProductsActions = {
  findAll,
};
