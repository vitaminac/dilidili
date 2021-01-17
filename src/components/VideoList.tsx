import React from "react";
import { VideoDetail } from "../shapes";
import VideoListIdem from "./VideoListItem";

export default class IndexHot extends React.Component<{
  videos: VideoDetail[];
  loadVideosList: () => void;
}> {
  componentDidMount() {
    this.props.loadVideosList();
  }

  render() {
    return (
      <div className="right-block floatleft">
        {this.props.videos.slice(0, 6).map((video, index) => (
          <VideoListIdem key={index} {...video} />
        ))}
        <div className="clear"></div>
      </div>
    );
  }
}
