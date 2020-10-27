import { BaseDomainEntity } from './BaseDomainEntity';

export interface User extends BaseDomainEntity {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
