import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { ProductReducer } from '../components/product/Product/Reducer';
import { ProductsReducer } from '../components/product/Products/Reducer';

const combinedReducer = combineReducers({
  products: ProductsReducer,
  product: ProductReducer,
});

const middleware = [thunk];

const inittialState = {};

export const Store = createStore(
  combinedReducer,
  inittialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export type State = ReturnType<typeof combinedReducer>;
