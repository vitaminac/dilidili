import React from "react";
import { VideoDetail } from "../shapes";
import VideoListIdem from "./VideoListItem";

interface Props {
  videos: VideoDetail[];
  loadVideosList: () => void;
}

export default class VideoList extends React.Component<Props> {
  componentDidMount() {
    this.props.loadVideosList();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.videos.slice(0, 6).map((video, index) => (
          <VideoListIdem key={index} {...video} />
        ))}
      </React.Fragment>
    );
  }
}
