import { User } from '../../user/type/User';
import { AuthToken } from './AuthToken';

export interface AuthData {
  user: User;
  authToken: AuthToken;
}
