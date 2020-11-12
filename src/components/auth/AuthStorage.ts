import { BaseLocalStorage } from '../../srorage/BaseLocalStorage';
import { AuthData } from './type/AuthData';
import { AuthToken } from './type/AuthToken';
import { User } from './type/User';

class AuthDataEntity implements AuthData {
  user!: User;
  authToken!: AuthToken;
}

export class AuthStorage extends BaseLocalStorage<AuthData> {
  constructor() {
    super('AUTH_AUTH_DATA', AuthDataEntity);
  }
}
