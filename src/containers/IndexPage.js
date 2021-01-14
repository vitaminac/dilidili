import React from "react";
import IndexBanner from "../components/IndexBanner";
import IndexHot from "../components/IndexHot";
import AllRank from "../components/AllRank";

export default class IndexPage extends React.Component {
  componentDidMount() {
    document.title = "BH5 | 首页";
  }

  render() {
    return (
      <div id="index-head-area" className="area">
        <div className="area-inner">
          <div className="left-block floatleft">
            <IndexBanner />
          </div>
          <IndexHot />
          <div className="clear"></div>
        </div>
        <AllRank />
      </div>
    );
  }
}