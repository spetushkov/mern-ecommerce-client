import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'reflect-metadata';
import { App } from './App';
import './assets/themes/bootswatch/lux/bootstrap.min.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { ReduxStore } from './store/Redux';
import { AppContext } from './utils/AppContext';

AppContext.config();

ReactDOM.render(
  <Provider store={ReduxStore}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
