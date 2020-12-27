import React from "react";
import BangumiIndex from "../components/BangumiIndex";
import BangumiList from "../components/BangumiList";
export default class BangumiIndexPage extends React.Component {
  componentDidMount() {
    document.title = "BH5 | 番剧";
  }
  render() {
    return (
      <div id="main-container">
        <BangumiIndex />
        <BangumiList />
      </div>
    );
  }
}
