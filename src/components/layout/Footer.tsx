import React from "react";
import style from "./Footer.module.css";

export default function Footer() {
  return (
    <div id="footer">
      <div className="area-inner">
        <div className="about-block floatleft">
          <div className="about-item left floatleft">
            <div className="about-title">About</div>
            <div className={style.aboutLinks}>
              <a href="http://www.bilibili.com">BiliBili弹幕视频网</a>
              <a href="https://github.com/vitaminac/dilidili">项目地址</a>
            </div>
          </div>
          <div className="about-item floatleft">
            <div className="about-title">Contact</div>
            <div className={style.aboutLinks}>
              <a href="https://vitaminac.github.io/">Blog</a>
              <a href="https://github.com/vitaminac">Github</a>
            </div>
          </div>
          <div className="about-item right floatleft">
            <div className="about-title">Copyright</div>
            <div className={style.aboutLinks}>
              <span>{`© 1997-${new Date().getFullYear()}`}</span>
            </div>
          </div>
        </div>
        <div className="clear"></div>
      </div>
    </div>
  );
}
