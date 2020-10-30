import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { ProductStore } from '../components/product/Product/ProductStore';
import { ProductsStore } from '../components/product/Products/ProductsStore';

const combinedReducer = combineReducers({
  products: ProductsStore.reducer,
  product: ProductStore.reducer,
});

const middleware = [thunk];

const inittialState = {};

export type State = ReturnType<typeof combinedReducer>;
export const Store = createStore(
  combinedReducer,
  inittialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);
