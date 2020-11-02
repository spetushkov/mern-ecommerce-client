import { Dispatch } from 'redux';
import { OrderItem } from '../../shared/OrderItem';
import { Product } from '../../shared/Product';
import { ShippingAddress } from '../../shared/ShippingAddress';
import { State } from '../../store/Store';
import { PaymentMethod } from '../checkout/payment/PaymentMethod';
import { ProductApi } from '../product/ProductApi';
import { CartStorage } from './CartStorage';
import { CartStore } from './CartStore';

const addOrderItem = (id: string, quantity: number) => async (
  dispatch: Dispatch,
  getState: () => State,
): Promise<void> => {
  try {
    dispatch(CartStore.action('CART_LOAD'));

    const data = await ProductApi.findById(id);
    if (data.error) {
      dispatch(CartStore.action('CART_FAIL', data.error));
      return;
    }

    if (!data.data) {
      return;
    }

    const product: Product = data.data;
    const orderItem: OrderItem = {
      product: product.id,
      quantity,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
    };

    dispatch(CartStore.action('CART_ADD_ORDER_ITEM', orderItem));

    CartStorage.saveOrderItems(getState().cart.orderItems);
  } catch (error) {
    dispatch(CartStore.action('CART_FAIL', error));
  }
};

const removeOrderItem = (id: string) => (getState: () => State): void => {
  try {
    const orderItem: Pick<OrderItem, 'product'> = {
      product: id,
    };

    CartStore.action('CART_REMOVE_ORDER_ITEM', orderItem);

    CartStorage.saveOrderItems(getState().cart.orderItems);
  } catch (error) {
    CartStore.action('CART_FAIL', error);
  }
};

const saveShippingAddress = (shippingAddress: ShippingAddress): void => {
  try {
    CartStore.action('CART_SAVE_SHIPPING_ADDRESS', shippingAddress);

    CartStorage.saveShippingAddress(shippingAddress);
  } catch (error) {
    CartStore.action('CART_FAIL', error);
  }
};

const savePaymentMethod = (paymentMethod: PaymentMethod): void => {
  try {
    CartStore.action('CART_SAVE_PAYMENT_METHOD', paymentMethod);

    CartStorage.savePaymentMethod(paymentMethod);
  } catch (error) {
    CartStore.action('CART_FAIL', error);
  }
};

export const CartActions = {
  addOrderItem,
  removeOrderItem,
  saveShippingAddress,
  savePaymentMethod,
};
