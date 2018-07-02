import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";

const store = createStore(rootReducer);
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
