import { BaseLocalStorage } from '../../../srorage/BaseLocalStorage';
import { PaymentMethod } from './PaymentMethod';

class PaymentMethodEntity {
  value!: PaymentMethod;
}

export class ShippingAddressStorage extends BaseLocalStorage<PaymentMethodEntity> {
  constructor() {
    super('CART_SHIPPING_ADDRESS', PaymentMethodEntity);
  }
}
