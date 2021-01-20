import { BaseLocalStorage } from '../../../srorage/BaseLocalStorage';
import { OrderShippingAddress } from './type/OrderShippingAddress';

class ShippingAddressEntity implements OrderShippingAddress {
  address = '';
  city = '';
  postalCode = '';
  country = '';
}

export class OrderShippingAddressStorage extends BaseLocalStorage<OrderShippingAddress> {
  constructor() {
    super('CART_SHIPPING_ADDRESS', ShippingAddressEntity);
  }
}
