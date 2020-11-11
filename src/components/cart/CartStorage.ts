import { OrderItem } from '../../external/OrderItem';
import { BaseLocalStorage } from '../../srorage/BaseLocalStorage';

class OrderItemEntity implements OrderItem {
  product!: string;
  quantity!: number;
  name!: string;
  image!: string;
  price!: number;
  countInStock!: number;
}

export class CartStorage extends BaseLocalStorage<OrderItemEntity> {
  constructor() {
    super('CART_ORDER_ITEMS', OrderItemEntity);
  }
}
