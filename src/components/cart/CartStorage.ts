import { OrderItem } from '../../externalTypes/OrderItem';
import { ShippingAddress } from '../../externalTypes/ShippingAddress';
import { PaymentMethod } from '../checkout/payment/PaymentMethod';

const CartStorageKey = {
  CART_ORDER_ITEMS: 'CART_ORDER_ITEMS',
  CART_SHIPPING_ADDRESS: 'CART_SHIPPING_ADDRESS',
  CART_PAYMENT_METHOD: 'CART_PAYMENT_METHOD',
};

const saveOrderItems = (orderItems: OrderItem[]): void => {
  localStorage.setItem(CartStorageKey.CART_ORDER_ITEMS, JSON.stringify(orderItems));
};

const saveShippingAddress = (shippingAddress: ShippingAddress): void => {
  localStorage.setItem(CartStorageKey.CART_SHIPPING_ADDRESS, JSON.stringify(shippingAddress));
};

const savePaymentMethod = (paymentMethod: PaymentMethod): void => {
  localStorage.setItem(CartStorageKey.CART_PAYMENT_METHOD, JSON.stringify(paymentMethod));
};

export const CartStorage = {
  saveOrderItems,
  saveShippingAddress,
  savePaymentMethod,
};
