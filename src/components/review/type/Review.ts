import { BaseEntity } from '../../../entity/BaseEntity';

export interface Review extends BaseEntity {
  name?: string;
  rating: number;
  comment: string;
  user: string; // reference: Review MANY_TO_ONE User
  product: string; // reference: Review MANY_TO_ONE Product
}
