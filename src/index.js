import React from "react";
import ReactDOM from "react-dom";
import "../src/assets/css/index.css";
import App from "./App";
import configureStore from "./redux/store/playliststore.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={configureStore}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
