import { BaseLocalStorage } from '../../srorage/BaseLocalStorage';
import { AuthUtils } from './AuthUtils';
import { AuthData } from './type/AuthData';

class AuthDataEntity implements AuthData {
  user = { id: '', name: '', email: '', password: '' };
  accessToken = { token: '', expiresIn: 0, expiresAt: '' };
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

    const dataUpdated = { ...data, authToken: { ...data.accessToken, token: '' } };
    super.save(dataUpdated);
  }
}
