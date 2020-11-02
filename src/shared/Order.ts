import { BaseDomain } from './BaseDomain';
import { OrderItem } from './OrderItem';
import { PaymentResult } from './PaymentResult';
import { ShippingAddress } from './ShippingAddress';
import { User } from './User';

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
