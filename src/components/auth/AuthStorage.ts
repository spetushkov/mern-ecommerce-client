import { BaseLocalStorage } from '../../srorage/BaseLocalStorage';
import { User } from '../user/type/User';
import { AuthUtils } from './AuthUtils';
import { AuthData } from './type/AuthData';
import { AuthToken } from './type/AuthToken';

class AuthDataEntity implements AuthData {
  user!: User;
  authToken!: AuthToken;
}

export class AuthStorage extends BaseLocalStorage<AuthData> {
  constructor() {
    super('AUTH_AUTH_DATA', AuthDataEntity);
  }

  save(data: AuthData): void {
    if (!AuthUtils.isCookiesStorage()) {
      super.save(data);
      return;
    }

    const dataUpdated = { ...data, authToken: { ...data.authToken, token: '' } };
    super.save(dataUpdated);
  }
}
