import { Dispatch } from 'redux';
import { State } from '../../store/Store';
import { AuthUtils } from '../auth/AuthUtils';
import { ProductApi } from './ProductApi';
import { ProductStore } from './ProductStore';

const findAll = () => async (dispatch: Dispatch, getState: () => State): Promise<void> => {
  try {
    dispatch(ProductStore.action('PRODUCT_REQUEST'));

    const token = AuthUtils.getToken(getState().auth);

    const response = await ProductApi.findAll(token);
    if (response.error) {
      dispatch(ProductStore.action('PRODUCT_ERROR', response.error));
      return;
    }

    if (!response.data || !response.paginator) {
      return;
    }

    const { data, paginator } = response;

    dispatch(ProductStore.action('PRODUCT_FIND_ALL', { data, paginator }));
  } catch (error) {
    dispatch(ProductStore.action('PRODUCT_ERROR', error));
  }
};

const findById = (id: string) => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(ProductStore.action('PRODUCT_REQUEST'));

    const response = await ProductApi.findById(id);
    if (response.error) {
      dispatch(ProductStore.action('PRODUCT_ERROR', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(ProductStore.action('PRODUCT_FIND_BY_ID', response.data));
  } catch (error) {
    dispatch(ProductStore.action('PRODUCT_ERROR', error));
  }
};

export const ProductActions = {
  findAll,
  findById,
};
