import { ApiEntity } from '../../../api/type/ApiEntity';
import { ApplicationRole } from './ApplicationRole';

export interface AuthUser extends ApiEntity {
  email: string;
  password: string;
  roles?: ApplicationRole[];
}
