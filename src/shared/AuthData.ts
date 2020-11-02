import { AuthToken } from './AuthToken';
import { User } from './User';

export interface AuthData {
  user: User;
  authToken: AuthToken;
}
