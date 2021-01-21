import { Dispatch } from 'redux';
import { State } from '../../store/Store';
import { AuthUtils } from '../auth/AuthUtils';
import { ReviewApi } from '../review/ReviewApi';
import { Review } from '../review/type/Review';
import { ProductApi } from './ProductApi';
import { ProductReducer } from './ProductReducer';
import { Product } from './type/Product';

const findAll = (keyword?: string, page?: string, pageLimit?: string, sort?: string) => async (
  dispatch: Dispatch,
): Promise<void> => {
  try {
    dispatch(ProductReducer.action('PRODUCT_REQUEST'));

    const response = await ProductApi.findAll(keyword, page, pageLimit, sort);
    if (response.error) {
      dispatch(ProductReducer.action('PRODUCT_ERROR', response.error));
      return;
    }

    if (!response.data || !response.paginator) {
      return;
    }

    const { data, paginator } = response;

    dispatch(ProductReducer.action('PRODUCT_FIND_ALL', { data, paginator }));
  } catch (error) {
    dispatch(ProductReducer.action('PRODUCT_ERROR', error));
  }
};

const findTopRated = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(ProductReducer.action('PRODUCT_REQUEST'));

    const keyword = undefined;
    const page = undefined;
    const response = await ProductApi.findAll(keyword, page, '3', '-rating');
    if (response.error) {
      dispatch(ProductReducer.action('PRODUCT_ERROR', response.error));
      return;
    }

    if (!response.data || !response.paginator) {
      return;
    }

    const { data, paginator } = response;

    dispatch(ProductReducer.action('PRODUCT_FIND_TOP_RATAED', { data, paginator }));
  } catch (error) {
    dispatch(ProductReducer.action('PRODUCT_ERROR', error));
  }
};

const findById = (id: string) => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(ProductReducer.action('PRODUCT_REQUEST'));

    const response = await ProductApi.findById(id);
    if (response.error) {
      dispatch(ProductReducer.action('PRODUCT_ERROR', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(ProductReducer.action('PRODUCT_FIND_BY_ID', response.data));
  } catch (error) {
    dispatch(ProductReducer.action('PRODUCT_ERROR', error));
  }
};

const save = (product: Product) => async (
  dispatch: Dispatch,
  getState: () => State,
): Promise<void> => {
  try {
    dispatch(ProductReducer.action('PRODUCT_REQUEST'));

    const token = AuthUtils.getToken(getState().auth);

    const response = await ProductApi.save(product, token);
    if (response.error) {
      dispatch(ProductReducer.action('PRODUCT_ERROR', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(ProductReducer.action('PRODUCT_SAVE', response.data));
  } catch (error) {
    dispatch(ProductReducer.action('PRODUCT_ERROR', error));
  }
};

const updateById = (id: string, query: Partial<Product>) => async (
  dispatch: Dispatch,
  getState: () => State,
): Promise<void> => {
  try {
    dispatch(ProductReducer.action('PRODUCT_REQUEST'));

    const token = AuthUtils.getToken(getState().auth);

    const response = await ProductApi.updateById(id, query, token);
    if (response.error) {
      dispatch(ProductReducer.action('PRODUCT_ERROR', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(ProductReducer.action('PRODUCT_UPDATE_BY_ID', response.data));
  } catch (error) {
    dispatch(ProductReducer.action('PRODUCT_ERROR', error));
  }
};

const deleteById = (id: string) => async (
  dispatch: Dispatch,
  getState: () => State,
): Promise<void> => {
  try {
    dispatch(ProductReducer.action('PRODUCT_REQUEST'));

    const token = AuthUtils.getToken(getState().auth);

    await ProductApi.deleteById(id, token);

    dispatch(ProductReducer.action('PRODUCT_DELETE_BY_ID', { id }));
  } catch (error) {
    dispatch(ProductReducer.action('PRODUCT_ERROR', error));
  }
};

const resetProduct = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(ProductReducer.action('PRODUCT_RESET_PRODUCT'));
  } catch (error) {
    dispatch(ProductReducer.action('PRODUCT_ERROR', error));
  }
};

const saveReview = (review: Review) => async (
  dispatch: Dispatch,
  getState: () => State,
): Promise<void> => {
  try {
    dispatch(ProductReducer.action('PRODUCT_REQUEST'));

    const token = AuthUtils.getToken(getState().auth);

    const response = await ReviewApi.save(review, token);
    if (response.error) {
      dispatch(ProductReducer.action('PRODUCT_ERROR', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(ProductReducer.action('PRODUCT_SAVE_REVIEW'));
  } catch (error) {
    dispatch(ProductReducer.action('PRODUCT_ERROR', error));
  }
};

export const ProductActions = {
  findAll,
  findTopRated,
  findById,
  save,
  updateById,
  deleteById,
  saveReview,
  resetProduct,
};
