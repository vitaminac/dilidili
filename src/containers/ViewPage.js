import React from "react";
import Video from "../components/Video";

function titleCallback(content) {
  document.title = "BH5 | " + content;
}

export default function ViewPage() {
  return (
    <div id="main-container" className="concat">
      <Video cb={titleCallback} aid={this.props.params.aid} />
    </div>
  );
}
