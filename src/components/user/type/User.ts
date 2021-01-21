import { ApiEntity } from '../../../api/type/ApiEntity';

export interface User extends ApiEntity {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}
