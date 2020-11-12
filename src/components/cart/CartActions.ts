import { Dispatch } from 'redux';
import { State } from '../../store/Store';
import { ProductApi } from '../product/ProductApi';
import { Product } from '../product/type/Product';
import { CartStore } from './CartStore';
import { OrderItemStorage } from './orderItem/OrderItemStorage';
import { OrderItem } from './orderItem/type/OrderItem';
import { PaymentMethod } from './paymentMethod/PaymentMethod';
import { ShippingAddressStorage } from './shippingAddress/ShippingAddressStorage';
import { ShippingAddress } from './shippingAddress/type/ShippingAddress';

const cartStorage = new OrderItemStorage();
const shippingAddressStorage = new ShippingAddressStorage();

const addOrderItem = (id: string, quantity: number) => async (
  dispatch: Dispatch,
  getState: () => State,
): Promise<void> => {
  try {
    dispatch(CartStore.action('CART_LOAD'));

    const response = await ProductApi.findById(id);
    if (response.error) {
      dispatch(CartStore.action('CART_FAIL', response.error));
      return;
    }

    if (!response.data) {
      return;
    }

    const product: Product = response.data;
    const orderItem: OrderItem = {
      product: product.id,
      quantity,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
    };

    dispatch(CartStore.action('CART_ADD_ORDER_ITEM', orderItem));

    cartStorage.save(getState().cart.data.orderItems);
  } catch (error) {
    dispatch(CartStore.action('CART_FAIL', error));
  }
};

const removeOrderItem = (id: string) => (dispatch: Dispatch, getState: () => State): void => {
  try {
    const orderItem: Pick<OrderItem, 'product'> = {
      product: id,
    };

    dispatch(CartStore.action('CART_REMOVE_ORDER_ITEM', orderItem));

    cartStorage.save(getState().cart.data.orderItems);
  } catch (error) {
    CartStore.action('CART_FAIL', error);
  }
};

const saveShippingAddress = (shippingAddress: ShippingAddress) => (dispatch: Dispatch): void => {
  try {
    dispatch(CartStore.action('CART_SAVE_SHIPPING_ADDRESS', shippingAddress));

    shippingAddressStorage.save(shippingAddress);
  } catch (error) {
    CartStore.action('CART_FAIL', error);
  }
};

const savePaymentMethod = (paymentMethod: PaymentMethod) => (dispatch: Dispatch): void => {
  try {
    dispatch(CartStore.action('CART_SAVE_PAYMENT_METHOD', paymentMethod));

    // CartStorage.savePaymentMethod(paymentMethod);
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
