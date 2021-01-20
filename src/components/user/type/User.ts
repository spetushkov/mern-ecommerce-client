import { BaseEntity } from '../../../entity/BaseEntity';

export interface User extends BaseEntity {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}
