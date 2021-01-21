import { AuthUser } from '../../auth/type/AuthUser';

export interface User extends AuthUser {
  name: string;
}
