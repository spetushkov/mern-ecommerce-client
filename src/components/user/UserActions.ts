import { Dispatch } from 'redux';
import { State } from '../../store/Store';
import { AuthUtils } from '../auth/AuthUtils';
import { User } from './type/User';
import { UserApi } from './UserApi';
import { UserStore } from './UserStore';

const findAll = () => async (dispatch: Dispatch, getState: () => State): Promise<void> => {
  try {
    dispatch(UserStore.action('USER_REQUEST'));

    const token = AuthUtils.getToken(getState().auth);

    const response = await UserApi.findAll(token);
    if (response.error) {
      dispatch(UserStore.action('USER_ERROR', response.error));
      return;
    }

    if (!response.data || !response.paginator) {
      return;
    }

    const { data, paginator } = response;

    dispatch(UserStore.action('USER_FIND_ALL', { data, paginator }));
  } catch (error) {
    dispatch(UserStore.action('USER_ERROR', error));
  }
};

const findById = (id: string) => async (
  dispatch: Dispatch,
  getState: () => State,
): Promise<void> => {
  try {
    dispatch(UserStore.action('USER_REQUEST'));

    const token = AuthUtils.getToken(getState().auth);

    const response = await UserApi.findById(token, id);
    if (response.error) {
      dispatch(UserStore.action('USER_ERROR', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(UserStore.action('USER_FIND_BY_ID', response.data));
  } catch (error) {
    dispatch(UserStore.action('USER_ERROR', error));
  }
};

const updateById = (id: string, query: Partial<User>) => async (
  dispatch: Dispatch,
  getState: () => State,
): Promise<void> => {
  try {
    dispatch(UserStore.action('USER_REQUEST'));

    const token = AuthUtils.getToken(getState().auth);

    const response = await UserApi.updateById(token, id, query);
    if (response.error) {
      dispatch(UserStore.action('USER_ERROR', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(UserStore.action('USER_UPDATE_BY_ID', response.data));
  } catch (error) {
    dispatch(UserStore.action('USER_ERROR', error));
  }
};

const deleteById = (id: string) => async (
  dispatch: Dispatch,
  getState: () => State,
): Promise<void> => {
  try {
    dispatch(UserStore.action('USER_REQUEST'));

    const token = AuthUtils.getToken(getState().auth);

    await UserApi.deleteById(token, id);

    dispatch(UserStore.action('USER_DELETE_BY_ID', { id }));
  } catch (error) {
    dispatch(UserStore.action('USER_ERROR', error));
  }
};

const reset = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(UserStore.action('USER_RESET'));
  } catch (error) {
    dispatch(UserStore.action('USER_ERROR', error));
  }
};

export const UserActions = {
  findAll,
  findById,
  updateById,
  deleteById,
  reset,
};
