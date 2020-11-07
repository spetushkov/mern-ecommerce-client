import { OrderItem } from '../../external/OrderItem';
import { ShippingAddress } from '../../external/ShippingAddress';
import { ReducerAction } from '../../store/reducer/ReducerAction';
import { ReducerActionCreator } from '../../store/reducer/ReducerActionCreator';
import { PaymentMethod } from '../checkout/payment/PaymentMethod';

type Action = ReducerAction<ActionType, Payload>;
const action = ReducerActionCreator<ActionType, Payload | Error>();

type Payload = Pick<OrderItem, 'product'> | OrderItem | ShippingAddress | PaymentMethod;

type ActionType =
  | 'CART_LOAD'
  | 'CART_ADD_ORDER_ITEM'
  | 'CART_REMOVE_ORDER_ITEM'
  | 'CART_SAVE_SHIPPING_ADDRESS'
  | 'CART_SAVE_PAYMENT_METHOD'
  | 'CART_FAIL';

export type CartState = {
  loading: boolean;
  data: {
    orderItems: OrderItem[];
    shippingAddress: ShippingAddress | null;
    paymentMethod: PaymentMethod | null;
  };
  error: Error | null;
};

const initialState: CartState = {
  loading: false,
  data: {
    orderItems: [],
    shippingAddress: null,
    paymentMethod: null,
  },
  error: null,
};

const reducer = (state = initialState, action: Action): CartState => {
  const { type, payload } = action;

  switch (type) {
    case 'CART_LOAD':
      return load(state);
    case 'CART_ADD_ORDER_ITEM':
      return addOrderItem(state, payload as OrderItem);
    case 'CART_REMOVE_ORDER_ITEM':
      return removeOrderItem(state, payload as Pick<OrderItem, 'product'>);
    case 'CART_SAVE_SHIPPING_ADDRESS':
      return saveShippingAddress(state, payload as ShippingAddress);
    case 'CART_SAVE_PAYMENT_METHOD':
      return savePaymentMethod(state, payload as PaymentMethod);
    case 'CART_FAIL':
      return fail(state, payload as Error);
    default:
      return state;
  }
};

const load = (state: CartState): CartState => {
  return { ...state, loading: true, error: null };
};

const addOrderItem = (state: CartState, orderItemAdd: OrderItem): CartState => {
  const orderItemFound = state.data.orderItems.find(
    (orderItem) => orderItem.product === orderItemAdd.product,
  );

  let orderItemsUpdated: OrderItem[] = [];
  if (orderItemFound) {
    const index = state.data.orderItems.findIndex(
      (orderItem) => orderItem.product === orderItemFound.product,
    );
    const orderItemUpdated = { ...orderItemFound, quantity: orderItemAdd.quantity };
    orderItemsUpdated = [...state.data.orderItems];
    orderItemsUpdated[index] = orderItemUpdated;
  } else {
    orderItemsUpdated = [...state.data.orderItems, orderItemAdd];
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

const saveShippingAddress = (state: CartState, shippingAddress: ShippingAddress): CartState => {
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

const savePaymentMethod = (state: CartState, paymentMethod: PaymentMethod): CartState => {
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

const fail = (state: CartState, error: Error): CartState => {
  return { ...state, loading: false, error };
};

export const CartStore = {
  action,
  reducer,
};
