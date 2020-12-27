import $ from "jquery";
import React from "react";
import Layout from "./components/layout/Layout";
import Routes from "./routes";
import "./App.css";

// TODO : remove
window.$ = $;
window.jQuery = $;

export default function App() {
  return (
    <Layout>
      <div id="main-container" className="concat">
        {Routes}
      </div>
    </Layout>
  );
}
