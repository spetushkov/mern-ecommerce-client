import { AuthData } from '../../external/AuthData';
import { AuthToken } from '../../external/AuthToken';
import { User } from '../../external/User';
import { BaseLocalStorage } from '../../srorage/BaseLocalStorage';

class AuthDataEntity implements AuthData {
  user!: User;
  authToken!: AuthToken;
}

export class AuthStorage extends BaseLocalStorage<AuthData> {
  constructor() {
    super('AUTH_AUTH_DATA', AuthDataEntity);
  }
}
