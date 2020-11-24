import { BaseDomain } from '../../../type/BaseDomain';
import { User } from '../../user/type/User';
import { Review } from './Review';

export interface Product extends BaseDomain {
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  user: User | string; // reference: Product MANY_TO_ONE User
  reviews?: Review[] | string[]; // reference (embedded doc): Product ONE_TO_ONE Review
}
