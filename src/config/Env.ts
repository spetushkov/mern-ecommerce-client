import { cleanEnv, str } from 'envalid';

export const Env = (): void => {
  cleanEnv(process.env, {
    REACT_APP_ENV_NAME: str(),
    REACT_APP_APP_API_URL: str(),
  });
};
