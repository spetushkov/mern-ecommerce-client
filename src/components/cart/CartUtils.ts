import { OrderItem } from './orderItem/type/OrderItem';

const getOrderItemsCount = (orderItems: OrderItem[]): number => {
  return orderItems ? orderItems.reduce((accumulator, item) => accumulator + item.quantity, 0) : 0;
};

export const CartUtils = {
  getOrderItemsCount,
};
