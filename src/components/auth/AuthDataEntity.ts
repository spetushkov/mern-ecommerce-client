import { AuthData } from '../../external/AuthData';
import { AuthToken } from '../../external/AuthToken';
import { User } from '../../external/User';

export class AuthDataEntity implements AuthData {
  user!: User;
  authToken!: AuthToken;
}
