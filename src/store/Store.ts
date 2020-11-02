import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { AuthStore } from '../components/auth/AuthStore';
import { CartStore } from '../components/cart/CartStore';
import { ProductStore } from '../components/product/Product/ProductStore';
import { ProductsStore } from '../components/product/Products/ProductsStore';

const combinedReducer = combineReducers({
  products: ProductsStore.reducer,
  product: ProductStore.reducer,
  cart: CartStore.reducer,
  auth: AuthStore.reducer,
});

const middleware = [thunk];

const inittialState = {};

export type State = ReturnType<typeof combinedReducer>;

export const Store = createStore(
  combinedReducer,
  inittialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);
