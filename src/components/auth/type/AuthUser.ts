import { ApiEntity } from '../../../api/type/ApiEntity';

export interface AuthUser extends ApiEntity {
  email: string;
  password: string;
  roles?: string[];
}
