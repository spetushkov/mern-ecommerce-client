import { BaseDomainEntity } from './BaseDomainEntity';

export interface Review extends BaseDomainEntity {
  name: string;
  rating: number;
  comment: string;
}
