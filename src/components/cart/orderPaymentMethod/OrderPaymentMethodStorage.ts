import { BaseLocalStorage } from '../../../srorage/BaseLocalStorage';
import { OrderPaymentMethod } from './type/OrderPaymentMethod';

class PaymentMethodEntity {
  value!: OrderPaymentMethod;
}

export class OrderPaymentMethodStorage extends BaseLocalStorage<PaymentMethodEntity> {
  constructor() {
    super('CART_PAYMENT_METHOD', PaymentMethodEntity);
  }
}
