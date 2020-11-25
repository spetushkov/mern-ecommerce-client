import { Dispatch } from 'redux';
import { State } from '../../store/Store';
import { AuthUtils } from '../auth/AuthUtils';
import { ConfigApi } from '../config/ConfigApi';
import { Config } from '../config/type/Config';
import { PayPalPaymentResult } from '../payPal/PayPalPaymentResult';
import { OrderApi } from './OrderApi';
import { OrderStore } from './OrderStore';
import { Order } from './type/Order';

const findAll = (queryByUserId: boolean) => async (
  dispatch: Dispatch,
  getState: () => State,
): Promise<void> => {
  try {
    dispatch(OrderStore.action('ORDER_REQUEST'));

    const token = AuthUtils.getToken(getState().auth);

    const response = await OrderApi.findAll(token, queryByUserId);
    if (response.error) {
      dispatch(OrderStore.action('ORDER_ERROR', response.error));
      return;
    }

    if (!response.data || !response.paginator) {
      return;
    }

    const { data, paginator } = response;

    dispatch(OrderStore.action('ORDER_FIND_ALL', { data, paginator }));
  } catch (error) {
    dispatch(OrderStore.action('ORDER_ERROR', error));
  }
};

const findById = (id: string, queryByUserId: boolean) => async (
  dispatch: Dispatch,
  getState: () => State,
): Promise<void> => {
  try {
    dispatch(OrderStore.action('ORDER_REQUEST'));

    const token = AuthUtils.getToken(getState().auth);

    const response = await OrderApi.findById(token, id, queryByUserId);
    if (response.error) {
      dispatch(OrderStore.action('ORDER_ERROR', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(OrderStore.action('ORDER_FIND_BY_ID', response.data));
  } catch (error) {
    dispatch(OrderStore.action('ORDER_ERROR', error));
  }
};

const save = (order: Order) => async (dispatch: Dispatch, getState: () => State): Promise<void> => {
  try {
    dispatch(OrderStore.action('ORDER_REQUEST'));

    const token = AuthUtils.getToken(getState().auth);

    const response = await OrderApi.save(token, order);
    if (response.error) {
      dispatch(OrderStore.action('ORDER_ERROR', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(OrderStore.action('ORDER_SAVE', response.data));
  } catch (error) {
    dispatch(OrderStore.action('ORDER_ERROR', error));
  }
};

const configFindById = (id: keyof Config) => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(OrderStore.action('ORDER_REQUEST'));

    const response = await ConfigApi.findById(id);
    if (response.error) {
      dispatch(OrderStore.action('ORDER_ERROR', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(OrderStore.action('ORDER_CONFIG_FIND_BY_ID', response.data));
  } catch (error) {
    dispatch(OrderStore.action('ORDER_ERROR', error));
  }
};

const pay = (id: string, paymentResult: { paymentResult: PayPalPaymentResult }) => async (
  dispatch: Dispatch,
  getState: () => State,
): Promise<void> => {
  try {
    dispatch(OrderStore.action('ORDER_REQUEST'));

    const token = AuthUtils.getToken(getState().auth);

    const response = await OrderApi.pay(token, id, paymentResult);
    if (response.error) {
      dispatch(OrderStore.action('ORDER_ERROR', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(OrderStore.action('ORDER_PAY', response.data));
  } catch (error) {
    dispatch(OrderStore.action('ORDER_ERROR', error));
  }
};

const reset = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(OrderStore.action('ORDER_RESET'));
  } catch (error) {
    dispatch(OrderStore.action('ORDER_ERROR', error));
  }
};

export const OrderActions = {
  findAll,
  findById,
  save,
  configFindById,
  pay,
  reset,
};
