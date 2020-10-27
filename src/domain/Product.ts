import { BaseDomainEntity } from './BaseDomainEntity';
import { Review } from './Review';
import { User } from './User';

export interface Product extends BaseDomainEntity {
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  user: User | string;
  reviews?: Review[] | string[];
}
