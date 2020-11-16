import { BaseLocalStorage } from '../../../srorage/BaseLocalStorage';
import { PaymentMethod } from './type/PaymentMethod';

class PaymentMethodEntity {
  value!: PaymentMethod;
}

export class PaymentMethodStorage extends BaseLocalStorage<PaymentMethodEntity> {
  constructor() {
    super('CART_PAYMENT_METHOD', PaymentMethodEntity);
  }
}
