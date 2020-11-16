import { BaseIterableLocalStorage } from '../../../srorage/BaseIterableLocalStorage';
import { OrderItem } from './type/OrderItem';

class OrderItemEntity implements OrderItem {
  product = '';
  quantity = 0;
  name = '';
  image = '';
  price = 0.0;
  countInStock = 0;
}

export class OrderItemStorage extends BaseIterableLocalStorage<OrderItem> {
  constructor() {
    super('CART_ORDER_ITEMS', OrderItemEntity);
  }
}
