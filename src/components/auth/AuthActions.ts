import { Dispatch } from 'redux';
import { User } from '../user/type/User';
import { AuthApi } from './AuthApi';
import { AuthReducer } from './AuthReducer';
import { AuthStorage } from './AuthStorage';

const authStorage = new AuthStorage();

const signUp = (user: User) => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(AuthReducer.action('AUTH_REQUEST'));

    const response = await AuthApi.signUp(user);
    if (response.error) {
      dispatch(AuthReducer.action('AUTH_ERROR', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(AuthReducer.action('SIGNUP', response.data));

    authStorage.save(response.data);
  } catch (error) {
    dispatch(AuthReducer.action('AUTH_ERROR', error));
  }
};

const signIn = (user: Pick<User, 'email' | 'password'>) => async (
  dispatch: Dispatch,
): Promise<void> => {
  try {
    dispatch(AuthReducer.action('AUTH_REQUEST'));

    const response = await AuthApi.signIn(user);
    if (response.error) {
      dispatch(AuthReducer.action('AUTH_ERROR', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(AuthReducer.action('SIGNIN', response.data));

    authStorage.save(response.data);
  } catch (error) {
    dispatch(AuthReducer.action('AUTH_ERROR', error));
  }
};

const signOut = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(AuthReducer.action('AUTH_REQUEST'));

    const response = await AuthApi.signOut();
    if (response.error) {
      dispatch(AuthReducer.action('AUTH_ERROR', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    dispatch(AuthReducer.action('SIGNOUT'));

    authStorage.remove();
  } catch (error) {
    dispatch(AuthReducer.action('AUTH_ERROR', error));
  }
};

export const AuthActions = {
  signUp,
  signIn,
  signOut,
};
