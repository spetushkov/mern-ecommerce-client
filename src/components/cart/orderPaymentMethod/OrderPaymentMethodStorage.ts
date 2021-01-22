import { BaseLocalStorage } from '../../../srorage/BaseLocalStorage';

class PaymentMethodEntity {
  value = '';
}

export class OrderPaymentMethodStorage extends BaseLocalStorage<PaymentMethodEntity> {
  constructor() {
    super('CART_PAYMENT_METHOD', PaymentMethodEntity);
  }
}
