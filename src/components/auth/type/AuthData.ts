import { User } from '../../user/type/User';
import { AccessToken } from './AccessToken';

export interface AuthData {
  user: User;
  accessToken: AccessToken;
}
