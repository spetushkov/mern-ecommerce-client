import { Dispatch } from 'redux';
import { State } from '../../store/StoreConfig';
import { ProductApi } from '../product/ProductApi';
import { Product } from '../product/type/Product';
import { CartReducer } from './CartReducer';
import { OrderItemStorage } from './orderItem/OrderItemStorage';
import { OrderItem } from './orderItem/type/OrderItem';
import { OrderPaymentMethodStorage } from './orderPaymentMethod/OrderPaymentMethodStorage';
import { OrderPaymentMethod } from './orderPaymentMethod/type/OrderPaymentMethod';
import { OrderShippingAddressStorage } from './orderShippingAddress/OrderShippingAddressStorage';
import { OrderShippingAddress } from './orderShippingAddress/type/OrderShippingAddress';

const addOrderItem = (id: string, quantity: number) => async (
  dispatch: Dispatch,
  getState: () => State,
): Promise<void> => {
  try {
    dispatch(CartReducer.action('CART_REQUEST'));

    const response = await ProductApi.findById(id);
    if (response.error) {
      dispatch(CartReducer.action('CART_ERROR', response.error));
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

    dispatch(CartReducer.action('CART_ADD_ORDER_ITEM', orderItem));

    const cartStorage = new OrderItemStorage();
    cartStorage.save(getState().cart.data.orderItems);
  } catch (error) {
    dispatch(CartReducer.action('CART_ERROR', error));
  }
};

const removeOrderItem = (id: string) => (dispatch: Dispatch, getState: () => State): void => {
  try {
    const orderItem: Pick<OrderItem, 'product'> = {
      product: id,
    };

    dispatch(CartReducer.action('CART_REMOVE_ORDER_ITEM', orderItem));

    const cartStorage = new OrderItemStorage();
    cartStorage.save(getState().cart.data.orderItems);
  } catch (error) {
    CartReducer.action('CART_ERROR', error);
  }
};

const saveShippingAddress = (shippingAddress: OrderShippingAddress) => (
  dispatch: Dispatch,
): void => {
  try {
    dispatch(CartReducer.action('CART_SAVE_SHIPPING_ADDRESS', shippingAddress));

    const shippingAddressStorage = new OrderShippingAddressStorage();
    shippingAddressStorage.save(shippingAddress);
  } catch (error) {
    CartReducer.action('CART_ERROR', error);
  }
};

const savePaymentMethod = (paymentMethod: OrderPaymentMethod) => (dispatch: Dispatch): void => {
  try {
    dispatch(CartReducer.action('CART_SAVE_PAYMENT_METHOD', paymentMethod));

    const paymentMethodStorage = new OrderPaymentMethodStorage();
    paymentMethodStorage.save({ value: paymentMethod });
  } catch (error) {
    CartReducer.action('CART_ERROR', error);
  }
};

const reset = () => (dispatch: Dispatch): void => {
  try {
    dispatch(CartReducer.action('CART_RESET'));

    const paymentMethodStorage = new OrderPaymentMethodStorage();
    paymentMethodStorage.remove();

    const shippingAddressStorage = new OrderShippingAddressStorage();
    shippingAddressStorage.remove();

    const cartStorage = new OrderItemStorage();
    cartStorage.remove();
  } catch (error) {
    CartReducer.action('CART_ERROR', error);
  }
};

export const CartActions = {
  addOrderItem,
  removeOrderItem,
  saveShippingAddress,
  savePaymentMethod,
  reset,
};
