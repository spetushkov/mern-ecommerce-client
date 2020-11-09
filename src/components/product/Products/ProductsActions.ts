import { Dispatch } from 'redux';
import { State } from '../../../store/Store';
import { AuthUtils } from '../../auth/AuthUtils';
import { ProductApi } from '../ProductApi';
import { ProductsStore } from './ProductsStore';

const findAll = () => async (dispatch: Dispatch, getState: () => State): Promise<void> => {
  try {
    dispatch(ProductsStore.action('PRODUCTS_LOAD'));

    const token = AuthUtils.getToken(getState().auth);

    const response = await ProductApi.findAll(token);
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
