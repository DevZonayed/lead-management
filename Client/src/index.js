import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./redux/store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

// All Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/bootstrap-extended.css";
import "./assets/css/style.css";
import "./assets/css/icons.css";

import "./assets/css/dark-theme.css";
import "./assets/css/light-theme.css";
import "./assets/css/semi-dark.css";
import "./assets/css/header-colors.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </BrowserRouter>
  </Provider>
);
