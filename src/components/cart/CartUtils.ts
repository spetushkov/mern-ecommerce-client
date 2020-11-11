import { OrderItem } from '../../external/OrderItem';

const getOrderItemsCount = (orderItems: OrderItem[]): number => {
  return orderItems.reduce((accumulator, item) => accumulator + item.quantity, 0);
};

export const CartUtils = {
  getOrderItemsCount,
};
