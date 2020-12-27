import React, { FunctionComponent } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./reset.css";
import style from "./layout.module.css";

const Layout: FunctionComponent<{}> = ({ children }) => (
  <div className={style.layout}>
    <div className={style.header}>
      <Header />
    </div>
    <div className={style.content}>{children}</div>
    <div className={style.footer}>
      <Footer />
    </div>
  </div>
);

export default Layout;
