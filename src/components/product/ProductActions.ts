import { Dispatch } from 'redux';
import { ProductApi } from './ProductApi';
import { ProductStore } from './ProductStore';

const findById = (id: string) => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(ProductStore.action('PRODUCT_LOAD'));

    const response = await ProductApi.findById(id);
    if (response.error) {
      dispatch(ProductStore.action('PRODUCT_FAIL', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(ProductStore.action('PRODUCT_SUCCESS', response.data));
  } catch (error) {
    dispatch(ProductStore.action('PRODUCT_FAIL', error));
  }
};

export const ProductActions = {
  findById,
};
