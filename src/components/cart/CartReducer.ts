import { ReducerAction } from '../../store/reducer/ReducerAction';
import { ReducerActionCreator } from '../../store/reducer/ReducerActionCreator';
import { OrderItemStorage } from './orderItem/OrderItemStorage';
import { OrderItem } from './orderItem/type/OrderItem';
import { OrderPaymentMethodStorage } from './orderPaymentMethod/OrderPaymentMethodStorage';
import { OrderPaymentMethod } from './orderPaymentMethod/type/OrderPaymentMethod';
import { OrderShippingAddressStorage } from './orderShippingAddress/OrderShippingAddressStorage';
import { OrderShippingAddress } from './orderShippingAddress/type/OrderShippingAddress';

type Action = ReducerAction<ActionType, Payload>;
const action = ReducerActionCreator<ActionType, Payload | Error>();

type Payload = Pick<OrderItem, 'product'> | OrderItem | OrderShippingAddress | OrderPaymentMethod;

type ActionType =
  | 'CART_REQUEST'
  | 'CART_ADD_ORDER_ITEM'
  | 'CART_REMOVE_ORDER_ITEM'
  | 'CART_SAVE_SHIPPING_ADDRESS'
  | 'CART_SAVE_PAYMENT_METHOD'
  | 'CART_RESET'
  | 'CART_ERROR';

export type CartState = {
  loading: boolean;
  data: {
    orderItems: OrderItem[] | null;
    shippingAddress: OrderShippingAddress | null;
    paymentMethod: OrderPaymentMethod | null;
  };
  error: Error | null;
};

const getOrderItemsFromStorage = () => {
  const orderItemStorage = new OrderItemStorage();
  return orderItemStorage.findAll();
};

const getShippingAddressFromStorage = () => {
  const shippingAddressStorage = new OrderShippingAddressStorage();
  return shippingAddressStorage.find();
};

const getPaymentMethodFromStorage = () => {
  const paymentMethodStorage = new OrderPaymentMethodStorage();
  const paymentMethodEntity = paymentMethodStorage.find();
  return paymentMethodEntity ? paymentMethodEntity.value : null;
};

const initialState: CartState = {
  loading: false,
  data: {
    orderItems: getOrderItemsFromStorage(),
    shippingAddress: getShippingAddressFromStorage(),
    paymentMethod: getPaymentMethodFromStorage(),
  },
  error: null,
};

const reducer = (state = initialState, action: Action): CartState => {
  const { type, payload } = action;

  switch (type) {
    case 'CART_REQUEST':
      return load(state);
    case 'CART_ADD_ORDER_ITEM':
      return addOrderItem(state, payload as OrderItem);
    case 'CART_REMOVE_ORDER_ITEM':
      return removeOrderItem(state, payload as Pick<OrderItem, 'product'>);
    case 'CART_SAVE_SHIPPING_ADDRESS':
      return saveShippingAddress(state, payload as OrderShippingAddress);
    case 'CART_SAVE_PAYMENT_METHOD':
      return savePaymentMethod(state, payload as OrderPaymentMethod);
    case 'CART_RESET':
      return reset();
    case 'CART_ERROR':
      return fail(state, payload as Error);
    default:
      return state;
  }
};

const load = (state: CartState): CartState => {
  return { ...state, loading: true, error: null };
};

const addOrderItem = (state: CartState, orderItemAdd: OrderItem): CartState => {
  let { orderItems } = state.data;
  if (!orderItems) {
    orderItems = [];
  }

  const orderItemFound =
    orderItems && orderItems.find((orderItem) => orderItem.product === orderItemAdd.product);

  let orderItemsUpdated: OrderItem[] = [];
  if (orderItemFound) {
    const index = orderItems.findIndex((orderItem) => orderItem.product === orderItemFound.product);
    const orderItemUpdated = { ...orderItemFound, quantity: orderItemAdd.quantity };
    orderItemsUpdated = [...orderItems];
    orderItemsUpdated[index] = orderItemUpdated;
  } else {
    orderItemsUpdated = [...orderItems, orderItemAdd];
  }

  return {
    ...state,
    data: {
      ...state.data,
      orderItems: orderItemsUpdated,
    },
    loading: false,
    error: null,
  };
};

const removeOrderItem = (
  state: CartState,
  productItemRemove: Pick<OrderItem, 'product'>,
): CartState => {
  if (!state.data.orderItems) {
    return state;
  }

  const itemsUpdated = state.data.orderItems.filter(
    (item) => item.product !== productItemRemove.product,
  );

  return {
    ...state,
    data: {
      ...state.data,
      orderItems: itemsUpdated,
    },
    loading: false,
    error: null,
  };
};

const saveShippingAddress = (
  state: CartState,
  shippingAddress: OrderShippingAddress,
): CartState => {
  return {
    ...state,
    data: {
      ...state.data,
      shippingAddress,
    },
    loading: false,
    error: null,
  };
};

const savePaymentMethod = (state: CartState, paymentMethod: OrderPaymentMethod): CartState => {
  return {
    ...state,
    data: {
      ...state.data,
      paymentMethod,
    },
    loading: false,
    error: null,
  };
};

const reset = (): CartState => {
  return initialState;
};

const fail = (state: CartState, error: Error): CartState => {
  return { ...state, loading: false, error };
};

export const CartReducer = {
  action,
  reducer,
};
