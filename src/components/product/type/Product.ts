import { ApiEntity } from '../../../api/type/ApiEntity';
import { Review } from '../../review/type/Review';
import { User } from '../../user/type/User';

export interface Product extends ApiEntity {
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
  reviews?: string[]; // reference: Product MANY_TO_ONE Review
  _reviews?: Review[] | string[];
}
