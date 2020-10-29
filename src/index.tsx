import React from 'react';
import ReactDOM from 'react-dom';
import 'reflect-metadata';
import { App } from './app/App';
import './index.module.scss';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
