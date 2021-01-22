import { ApplicationRole } from '../../auth/type/ApplicationRole';
import { AuthUser } from '../../auth/type/AuthUser';

export interface User extends AuthUser {
  name: string;
  email: string;
  password: string;
  roles?: ApplicationRole[];
}
