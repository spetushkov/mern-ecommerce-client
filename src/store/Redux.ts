import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { ProductListReducer } from '../components/ProductList/Reducer';

const combinedReducer = combineReducers({
  productList: ProductListReducer,
});

const middleware = [thunk];

const inittialState = {};

export const Store = createStore(
  combinedReducer,
  inittialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export type State = ReturnType<typeof combinedReducer>;
