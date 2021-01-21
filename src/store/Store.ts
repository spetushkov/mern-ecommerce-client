import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { AuthReducer } from '../components/auth/AuthReducer';
import { CartReducer } from '../components/cart/CartReducer';
import { OrderReducer } from '../components/order/OrderReducer';
import { ProductReducer } from '../components/product/ProductReducer';
import { UserReducer } from '../components/user/UserReducer';

const combinedReducer = combineReducers({
  product: ProductReducer.reducer,
  auth: AuthReducer.reducer,
  user: UserReducer.reducer,
  cart: CartReducer.reducer,
  order: OrderReducer.reducer,
});

const middleware = [thunk];

const inittialState = {};

export type State = ReturnType<typeof combinedReducer>;

export const Store = createStore(
  combinedReducer,
  inittialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);
