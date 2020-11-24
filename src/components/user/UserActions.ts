import { Dispatch } from 'redux';
import { State } from '../../store/Store';
import { AuthUtils } from '../auth/AuthUtils';
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

export const UserActions = {
  findAll,
  findById,
};
