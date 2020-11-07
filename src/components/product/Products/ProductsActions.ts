import { Dispatch } from 'redux';
import { ProductApi } from '../ProductApi';
import { ProductsStore } from './ProductsStore';

const findAll = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(ProductsStore.action('PRODUCTS_LOAD'));

    const response = await ProductApi.findAll();
    if (response.error) {
      dispatch(ProductsStore.action('PRODUCTS_FAIL', response.error));
      return;
    }

    if (!response.data || !response.paginator) {
      return;
    }

    const { data, paginator } = response;

    dispatch(ProductsStore.action('PRODUCTS_SUCCESS', { data, paginator }));
  } catch (error) {
    dispatch(ProductsStore.action('PRODUCTS_FAIL', error));
  }
};

export const ProductsActions = {
  findAll,
};
