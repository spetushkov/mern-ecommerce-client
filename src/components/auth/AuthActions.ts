import { Dispatch } from 'redux';
import { AuthApi } from './AuthApi';
import { AuthStorage } from './AuthStorage';
import { AuthStore } from './AuthStore';
import { User } from './type/User';

const authStorage = new AuthStorage();

const signUp = (user: User) => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(AuthStore.action('AUTH_PENDING'));

    const response = await AuthApi.signUp(user);
    if (response.error) {
      dispatch(AuthStore.action('AUTH_ERROR', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(AuthStore.action('SIGNUP', response.data));

    authStorage.save(response.data);
  } catch (error) {
    dispatch(AuthStore.action('AUTH_ERROR', error));
  }
};

const signIn = (user: Pick<User, 'email' | 'password'>) => async (
  dispatch: Dispatch,
): Promise<void> => {
  try {
    dispatch(AuthStore.action('AUTH_PENDING'));

    const response = await AuthApi.signIn(user);
    if (response.error) {
      dispatch(AuthStore.action('AUTH_ERROR', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(AuthStore.action('SIGNIN', response.data));

    authStorage.save(response.data);
  } catch (error) {
    dispatch(AuthStore.action('AUTH_ERROR', error));
  }
};

const signOut = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(AuthStore.action('AUTH_PENDING'));

    const response = await AuthApi.signOut();
    if (response.error) {
      dispatch(AuthStore.action('AUTH_ERROR', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(AuthStore.action('SIGNOUT'));

    authStorage.remove();
  } catch (error) {
    dispatch(AuthStore.action('AUTH_ERROR', error));
  }
};

export const AuthActions = {
  signUp,
  signIn,
  signOut,
};
