import { BaseDomain } from '../../../../type/BaseDomain';
import { User } from '../../../auth/type/User';
import { OrderItem } from '../../orderItem/type/OrderItem';
import { PaymentMethod } from '../../paymentMethod/type/PaymentMethod';
import { ShippingAddress } from '../../shippingAddress/type/ShippingAddress';
import { PaymentResult } from './PaymentResult';

export interface Order extends BaseDomain {
  user?: User | string; // reference: Order MANY_TO_ONE User
  orderItems: OrderItem[]; // reference (embedded doc): Order ONE_TO_ONE OrderItem
  shippingAddress: ShippingAddress | null;
  paymentMethod: PaymentMethod | null;
  taxPrice: number;
  shippingPrice: number;
  paymentResult?: PaymentResult;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
}
