import { AuthData } from '../../external/AuthData';
import { BaseLocalStorage } from '../../srorage/BaseLocalStorage';
import { AuthDataEntity } from './AuthDataEntity';

export class AuthStorage extends BaseLocalStorage<AuthData> {
  constructor() {
    super('AUTH_AUTH_DATA', AuthDataEntity);
  }
}
