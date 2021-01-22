import { ApiEntity } from '../../../api/type/ApiEntity';
import { Product } from '../../product/type/Product';
import { User } from '../../user/type/User';

export interface Review extends ApiEntity {
  name?: string;
  rating: number;
  comment: string;
  user: User | string; // reference: Review MANY_TO_ONE User
  product: Product | string; // reference: Review MANY_TO_ONE Product
}
