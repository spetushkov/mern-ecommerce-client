import { BaseDomain } from '../../../type/BaseDomain';
import { User } from '../../auth/type/User';
import { OrderItem } from '../../cart/orderItem/type/OrderItem';
import { PaymentMethod } from '../../cart/paymentMethod/type/PaymentMethod';
import { ShippingAddress } from '../../cart/shippingAddress/type/ShippingAddress';
import { PayPalPaymentResult } from '../../payPal/PayPalPaymentResult';

export interface Order extends BaseDomain {
  user?: User | string; // reference: Order MANY_TO_ONE User
  orderItems: OrderItem[]; // reference (embedded doc): Order ONE_TO_ONE OrderItem
  shippingAddress: ShippingAddress | null;
  paymentMethod: PaymentMethod | null;
  orderItemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  paymentResult?: PayPalPaymentResult;
  isPaid?: boolean;
  paidAt?: Date;
  isDelivered?: boolean;
  deliveredAt?: Date;
}
