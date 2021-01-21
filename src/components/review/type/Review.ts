import { ApiEntity } from '../../../api/type/ApiEntity';

export interface Review extends ApiEntity {
  name?: string;
  rating: number;
  comment: string;
  user: string; // reference: Review MANY_TO_ONE User
  product: string; // reference: Review MANY_TO_ONE Product
}
