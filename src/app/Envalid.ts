import { cleanEnv, str } from 'envalid';
import { Logger } from '../log/Logger';

export const Envalid = (): void => {
  cleanEnv(process.env, {
    REACT_APP_ENV_NAME: str(),
    REACT_APP_APP_API_URL: str(),
  });

  const { REACT_APP_ENV_NAME } = process.env;
  Logger.log(`App started in mode ${REACT_APP_ENV_NAME}`);
};
