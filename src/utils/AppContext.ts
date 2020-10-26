import { cleanEnv, str } from 'envalid';
import { Logger } from '../log/Logger';

export class AppContext {
  static config(): void {
    cleanEnv(process.env, {
      REACT_APP_ENV_NAME: str(),
    });

    const { REACT_APP_ENV_NAME } = process.env;
    Logger.log(`App started in mode ${REACT_APP_ENV_NAME}`);
  }
}
