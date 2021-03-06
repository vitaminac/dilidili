import React from "react";
import SortRank from "../components/SortRank";
import SortHot from "../components/SortHot";

function titleCallback(content) {
  document.title = "BH5 | 分类:" + content;
}

export default function SortPage() {
  return (
    <div id="main-container">
      <div className="area">
        <div className="area-inner">
          <SortRank cb={titleCallback} tid={this.props.params.tid} />
          <SortHot />
          <div className="clear"></div>
        </div>
      </div>
    </div>
  );
}
