import { Dispatch } from 'redux';
import { User } from '../../external/User';
import { AuthApi } from './AuthApi';
import { AuthStorage } from './AuthStorage';
import { AuthStore } from './AuthStore';

const signUp = (user: Omit<User, 'id'>) => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(AuthStore.action('AUTH_LOAD'));

    const data = await AuthApi.signUp(user);
    if (data.error) {
      dispatch(AuthStore.action('AUTH_FAIL', data.error));
      return;
    }

    if (!data.data) {
      return;
    }

    dispatch(AuthStore.action('AUTH_SUCCESS', data));

    AuthStorage.saveAuthData(data.data);
  } catch (error) {
    dispatch(AuthStore.action('AUTH_FAIL', error));
  }
};

const sigIn = (user: Pick<User, 'email' | 'password'>) => async (
  dispatch: Dispatch,
): Promise<void> => {
  try {
    dispatch(AuthStore.action('AUTH_LOAD'));

    const data = await AuthApi.signIn(user);
    if (data.error) {
      dispatch(AuthStore.action('AUTH_FAIL', data.error));
      return;
    }

    if (!data.data) {
      return;
    }

    dispatch(AuthStore.action('AUTH_SUCCESS', data));

    AuthStorage.saveAuthData(data.data);
  } catch (error) {
    dispatch(AuthStore.action('AUTH_FAIL', error));
  }
};

const sigOut = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(AuthStore.action('AUTH_LOAD'));

    const data = await AuthApi.signOut();
    if (data.error) {
      dispatch(AuthStore.action('AUTH_FAIL', data.error));
      return;
    }

    if (!data.data) {
      return;
    }

    dispatch(AuthStore.action('SIGNOUT_SUCCESS'));

    AuthStorage.removeAuthData();
  } catch (error) {
    dispatch(AuthStore.action('AUTH_FAIL', error));
  }
};

export const AuthActions = {
  signUp,
  sigIn,
  sigOut,
};
