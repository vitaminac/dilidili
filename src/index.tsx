import $ from "jquery"; // TODO: remove
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store";
import { FRONTEND_BASE_PATH } from "./config";
import Layout from "./components/layout/Layout";
import Routes from "./routes";
import "./index.css";

// TODO: remove
declare global {
  interface Window {
    $: any;
    jQuery: any;
  }
}
window["$"] = window["jQuery"] = $;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename={FRONTEND_BASE_PATH}>
        <Layout>
          <div id="main-container" className="concat">
            {Routes}
          </div>
        </Layout>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
