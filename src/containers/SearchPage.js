import React from "react";
import SearchContent from "../components/SearchContent";

function titleCallback(content) {
  document.title = "BH5 | 搜索:" + content;
}
export default function SearchPage() {
  return (
    <SearchContent
      cb={titleCallback}
      keyword={this.props.match.params.keyword}
    />
  );
}
