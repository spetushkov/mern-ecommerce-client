import { BaseDomain } from '../../../../type/BaseDomain';
import { User } from '../../../auth/type/User';
import { OrderItem } from '../../orderItem/type/OrderItem';
import { PaymentResult } from '../../paymentMethod/type/PaymentResult';
import { ShippingAddress } from '../../shippingAddress/type/ShippingAddress';

export interface Order extends BaseDomain {
  user: User | string; // reference: Order MANY_TO_ONE User
  orderItems?: OrderItem[]; // reference (embedded doc): Order ONE_TO_ONE OrderItem
  shippingAddress?: ShippingAddress;
  paymentMethod: string;
  paymentResult?: PaymentResult;
  taxPrice: number;
  shippingPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
}
