import { ApiEntity } from '../../../api/type/ApiEntity';
import { PayPalPaymentResult } from '../../../payPal/PayPalPaymentResult';
import { OrderItem } from '../../cart/orderItem/type/OrderItem';
import { OrderPaymentMethod } from '../../cart/orderPaymentMethod/type/OrderPaymentMethod';
import { OrderShippingAddress } from '../../cart/orderShippingAddress/type/OrderShippingAddress';
import { User } from '../../user/type/User';

export interface Order extends ApiEntity {
  user?: User | string; // reference: Order MANY_TO_ONE User
  orderItems: OrderItem[]; // reference (embedded doc): Order ONE_TO_ONE OrderItem
  shippingAddress: OrderShippingAddress | null;
  paymentMethod: OrderPaymentMethod | null;
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
