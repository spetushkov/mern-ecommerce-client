import { Dispatch } from 'redux';
import { State } from '../../store/StoreConfig';
import { AuthUtils } from '../auth/AuthUtils';
import { ConfigApi } from '../config/ConfigApi';
import { Config } from '../config/type/Config';
import { PayPalPaymentResult } from '../payPal/type/PayPalPaymentResult';
import { OrderApi } from './OrderApi';
import { OrderReducer } from './OrderReducer';
import { Order } from './type/Order';

const findAll = (queryByUserId: boolean) => async (
  dispatch: Dispatch,
  getState: () => State,
): Promise<void> => {
  try {
    dispatch(OrderReducer.action('ORDER_REQUEST'));

    const token = AuthUtils.getToken(getState().auth);

    const response = await OrderApi.findAll(queryByUserId, token);
    if (response.error) {
      dispatch(OrderReducer.action('ORDER_ERROR', response.error));
      return;
    }

    if (!response.data || !response.paginator) {
      return;
    }

    const { data, paginator } = response;

    dispatch(OrderReducer.action('ORDER_FIND_ALL', { data, paginator }));
  } catch (error) {
    dispatch(OrderReducer.action('ORDER_ERROR', error));
  }
};

const findById = (id: string, queryByUserId: boolean) => async (
  dispatch: Dispatch,
  getState: () => State,
): Promise<void> => {
  try {
    dispatch(OrderReducer.action('ORDER_REQUEST'));

    const token = AuthUtils.getToken(getState().auth);

    const response = await OrderApi.findById(id, queryByUserId, token);
    if (response.error) {
      dispatch(OrderReducer.action('ORDER_ERROR', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(OrderReducer.action('ORDER_FIND_BY_ID', response.data));
  } catch (error) {
    dispatch(OrderReducer.action('ORDER_ERROR', error));
  }
};

const save = (order: Order) => async (dispatch: Dispatch, getState: () => State): Promise<void> => {
  try {
    dispatch(OrderReducer.action('ORDER_REQUEST'));

    const token = AuthUtils.getToken(getState().auth);

    const response = await OrderApi.save(order, token);
    if (response.error) {
      dispatch(OrderReducer.action('ORDER_ERROR', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(OrderReducer.action('ORDER_SAVE', response.data));
  } catch (error) {
    dispatch(OrderReducer.action('ORDER_ERROR', error));
  }
};

const updateById = (id: string, query: Partial<Order>) => async (
  dispatch: Dispatch,
  getState: () => State,
): Promise<void> => {
  try {
    dispatch(OrderReducer.action('ORDER_REQUEST'));

    const token = AuthUtils.getToken(getState().auth);

    const response = await OrderApi.updateById(id, query, token);
    if (response.error) {
      dispatch(OrderReducer.action('ORDER_ERROR', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(OrderReducer.action('ORDER_UPDATE_BY_ID', response.data));
  } catch (error) {
    dispatch(OrderReducer.action('ORDER_ERROR', error));
  }
};

const configFindById = (id: keyof Config) => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(OrderReducer.action('ORDER_REQUEST'));

    const response = await ConfigApi.findById(id);
    if (response.error) {
      dispatch(OrderReducer.action('ORDER_ERROR', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(OrderReducer.action('ORDER_CONFIG_FIND_BY_ID', response.data));
  } catch (error) {
    dispatch(OrderReducer.action('ORDER_ERROR', error));
  }
};

const pay = (id: string, paymentResult: { paymentResult: PayPalPaymentResult }) => async (
  dispatch: Dispatch,
  getState: () => State,
): Promise<void> => {
  try {
    dispatch(OrderReducer.action('ORDER_REQUEST'));

    const token = AuthUtils.getToken(getState().auth);

    const response = await OrderApi.pay(id, paymentResult, token);
    if (response.error) {
      dispatch(OrderReducer.action('ORDER_ERROR', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(OrderReducer.action('ORDER_PAY', response.data));
  } catch (error) {
    dispatch(OrderReducer.action('ORDER_ERROR', error));
  }
};

const reset = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(OrderReducer.action('ORDER_RESET'));
  } catch (error) {
    dispatch(OrderReducer.action('ORDER_ERROR', error));
  }
};

export const OrderActions = {
  findAll,
  findById,
  save,
  updateById,
  configFindById,
  pay,
  reset,
};
