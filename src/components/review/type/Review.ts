import { BaseDomain } from '../../../type/BaseDomain';

export interface Review extends BaseDomain {
  name?: string;
  rating: number;
  comment: string;
  user: string; // reference: Review MANY_TO_ONE User
  product: string; // reference: Review MANY_TO_ONE Product
}
