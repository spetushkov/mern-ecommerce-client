import { BaseLocalStorage } from '../../../srorage/BaseLocalStorage';
import { ShippingAddress } from './type/ShippingAddress';

class ShippingAddressEntity implements ShippingAddress {
  address = '';
  city = '';
  postalCode = '';
  country = '';
}

export class ShippingAddressStorage extends BaseLocalStorage<ShippingAddress> {
  constructor() {
    super('CART_SHIPPING_ADDRESS', ShippingAddressEntity);
  }
}
