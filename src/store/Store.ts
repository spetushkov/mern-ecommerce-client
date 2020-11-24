import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { AuthStore } from '../components/auth/AuthStore';
import { CartStore } from '../components/cart/CartStore';
import { OrderStore } from '../components/order/OrderStore';
import { ProductStore } from '../components/product/ProductStore';
import { UserStore } from '../components/user/UserStore';

const combinedReducer = combineReducers({
  auth: AuthStore.reducer,
  product: ProductStore.reducer,
  user: UserStore.reducer,
  cart: CartStore.reducer,
  order: OrderStore.reducer,
});

const middleware = [thunk];

const inittialState = {};

export type State = ReturnType<typeof combinedReducer>;

export const Store = createStore(
  combinedReducer,
  inittialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);
