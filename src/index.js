import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.scss";
import "./css/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";

/* import bootstrap to react project */
// import "../node_modules/bootstrap/dist/css/bootstrap.css";
// import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
/*toastify */
import "react-toastify/dist/ReactToastify.css";
/* redux */
import { Provider } from "react-redux";
import store from "./store/index";
/* React router dom */
import { BrowserRouter } from "react-router-dom";

/*axios configuration */
// add this url before every axios request
// if the url is relative - then axios will ignore this url
axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;

axios.interceptors.request.use((config) => {
  const finalProjectToken = localStorage.getItem("finalProjectToken");
  if (finalProjectToken) {
    // if token saved in local storage then i want to add the token to the header of the request
    config.headers["x-auth-token"] = finalProjectToken;
  }
  return config;
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
