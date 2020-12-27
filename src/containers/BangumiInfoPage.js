var React = require("react");
var BangumiInfo = require("../components/BangumiInfo");

function titleCallback(content) {
  document.title = "BH5 | 番剧:" + content;
}

export default function () {
  return (
    <div id="main-container">
      <BangumiInfo cb={titleCallback} seasonId={this.props.params.seasonId} />
    </div>
  );
}
