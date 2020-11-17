import { Dispatch } from 'redux';
import { State } from '../../../store/Store';
import { AuthUtils } from '../../auth/AuthUtils';
import { OrderApi, OrderToPay } from './OrderApi';
import { OrderStore } from './OrderStore';
import { Order } from './type/Order';

const findAll = () => async (dispatch: Dispatch, getState: () => State): Promise<void> => {
  try {
    dispatch(OrderStore.action('ORDER_PENDING'));

    const token = AuthUtils.getToken(getState().auth);

    const response = await OrderApi.findAll(token);
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

const findById = (id: string) => async (
  dispatch: Dispatch,
  getState: () => State,
): Promise<void> => {
  try {
    dispatch(OrderStore.action('ORDER_PENDING'));

    const token = AuthUtils.getToken(getState().auth);

    const response = await OrderApi.findById(token, id);
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
    dispatch(OrderStore.action('ORDER_PENDING'));

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

const payById = (id: string, order: OrderToPay) => async (
  dispatch: Dispatch,
  getState: () => State,
): Promise<void> => {
  try {
    dispatch(OrderStore.action('ORDER_PENDING'));

    const token = AuthUtils.getToken(getState().auth);

    const response = await OrderApi.payById(token, id, order);
    if (response.error) {
      dispatch(OrderStore.action('ORDER_ERROR', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(OrderStore.action('ORDER_PAY_BY_ID', response.data));
  } catch (error) {
    dispatch(OrderStore.action('ORDER_ERROR', error));
  }
};

export const OrderActions = {
  findAll,
  findById,
  save,
  payById,
};
