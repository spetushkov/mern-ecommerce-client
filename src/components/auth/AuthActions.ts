import { Dispatch } from 'redux';
import { AuthApi } from './AuthApi';
import { AuthStorage } from './AuthStorage';
import { AuthStore } from './AuthStore';
import { User } from './type/User';

const authStorage = new AuthStorage();

const signUp = (user: User) => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(AuthStore.action('AUTH_LOAD'));

    const response = await AuthApi.signUp(user);
    if (response.error) {
      dispatch(AuthStore.action('AUTH_FAIL', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(AuthStore.action('AUTH_SUCCESS', response.data));

    authStorage.save(response.data);
  } catch (error) {
    dispatch(AuthStore.action('AUTH_FAIL', error));
  }
};

const signIn = (user: Pick<User, 'email' | 'password'>) => async (
  dispatch: Dispatch,
): Promise<void> => {
  try {
    dispatch(AuthStore.action('AUTH_LOAD'));

    const response = await AuthApi.signIn(user);
    if (response.error) {
      dispatch(AuthStore.action('AUTH_FAIL', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(AuthStore.action('AUTH_SUCCESS', response.data));

    authStorage.save(response.data);
  } catch (error) {
    dispatch(AuthStore.action('AUTH_FAIL', error));
  }
};

const signOut = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(AuthStore.action('AUTH_LOAD'));

    const response = await AuthApi.signOut();
    if (response.error) {
      dispatch(AuthStore.action('AUTH_FAIL', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(AuthStore.action('SIGNOUT_SUCCESS'));

    authStorage.remove();
  } catch (error) {
    dispatch(AuthStore.action('AUTH_FAIL', error));
  }
};

export const AuthActions = {
  signUp,
  signIn,
  signOut,
};
