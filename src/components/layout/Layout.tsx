import React, { FunctionComponent } from "react";
import "./reset.css";
import style from "./layout.module.css";

const Layout: FunctionComponent<{}> = ({ children }) => (
  <div className={style.layout}>
    <div className={style.header}>header</div>
    <div className={style.content}>{children}</div>
    <div className={style.footer}>footer</div>
  </div>
);

export default Layout;
