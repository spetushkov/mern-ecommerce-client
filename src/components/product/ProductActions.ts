import { Dispatch } from 'redux';
import { State } from '../../store/Store';
import { AuthUtils } from '../auth/AuthUtils';
import { ReviewApi } from '../review/ReviewApi';
import { Review } from '../review/type/Review';
import { ProductApi } from './ProductApi';
import { ProductStore } from './ProductStore';
import { Product } from './type/Product';

const findAll = (keyword?: string) => async (
  dispatch: Dispatch,
  getState: () => State,
): Promise<void> => {
  try {
    dispatch(ProductStore.action('PRODUCT_REQUEST'));

    const token = AuthUtils.getToken(getState().auth);

    const response = await ProductApi.findAll(token, keyword);
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

const save = (product: Product) => async (
  dispatch: Dispatch,
  getState: () => State,
): Promise<void> => {
  try {
    dispatch(ProductStore.action('PRODUCT_REQUEST'));

    const token = AuthUtils.getToken(getState().auth);

    const response = await ProductApi.save(token, product);
    if (response.error) {
      dispatch(ProductStore.action('PRODUCT_ERROR', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(ProductStore.action('PRODUCT_SAVE', response.data));
  } catch (error) {
    dispatch(ProductStore.action('PRODUCT_ERROR', error));
  }
};

const updateById = (id: string, query: Partial<Product>) => async (
  dispatch: Dispatch,
  getState: () => State,
): Promise<void> => {
  try {
    dispatch(ProductStore.action('PRODUCT_REQUEST'));

    const token = AuthUtils.getToken(getState().auth);

    const response = await ProductApi.updateById(token, id, query);
    if (response.error) {
      dispatch(ProductStore.action('PRODUCT_ERROR', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(ProductStore.action('PRODUCT_UPDATE_BY_ID', response.data));
  } catch (error) {
    dispatch(ProductStore.action('PRODUCT_ERROR', error));
  }
};

const deleteById = (id: string) => async (
  dispatch: Dispatch,
  getState: () => State,
): Promise<void> => {
  try {
    dispatch(ProductStore.action('PRODUCT_REQUEST'));

    const token = AuthUtils.getToken(getState().auth);

    await ProductApi.deleteById(token, id);

    dispatch(ProductStore.action('PRODUCT_DELETE_BY_ID', { id }));
  } catch (error) {
    dispatch(ProductStore.action('PRODUCT_ERROR', error));
  }
};

const resetProduct = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(ProductStore.action('PRODUCT_RESET_PRODUCT'));
  } catch (error) {
    dispatch(ProductStore.action('PRODUCT_ERROR', error));
  }
};

const saveReview = (review: Review) => async (
  dispatch: Dispatch,
  getState: () => State,
): Promise<void> => {
  try {
    dispatch(ProductStore.action('PRODUCT_REQUEST'));

    const token = AuthUtils.getToken(getState().auth);

    const response = await ReviewApi.save(token, review);
    if (response.error) {
      dispatch(ProductStore.action('PRODUCT_ERROR', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(ProductStore.action('PRODUCT_SAVE_REVIEW'));
  } catch (error) {
    dispatch(ProductStore.action('PRODUCT_ERROR', error));
  }
};

export const ProductActions = {
  findAll,
  findById,
  save,
  updateById,
  deleteById,
  saveReview,
  resetProduct,
};
