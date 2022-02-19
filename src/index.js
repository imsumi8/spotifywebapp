import React from 'react';
import ReactDOM from 'react-dom';
import '../src/assets/css/index.css';
import App from './App';
import configureStore from './redux/store/playliststore.js';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);  

