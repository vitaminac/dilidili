import React from "react";
import { Link } from "react-router-dom";
import { VideoDetail } from "../shapes";
import { ROUTES } from "../config";

export class VideoListItem extends React.Component<VideoDetail> {
  render() {
    return (
      <div className="video-block-mask floatleft">
        <Link to={ROUTES.VIDEO + "/" + this.props.videoId}>
          <div className="video-block-mask-preview">
            <img alt={this.props.title} src={this.props.cover} />
          </div>
          <div className="video-block-mask-mask"></div>

          <div className="video-block-mask-info">
            <div className="title">{this.props.title}</div>
            <div className="up">up主：{this.props.uploader}</div>
            <div className="play">播放：{this.props.playCount}</div>
          </div>
        </Link>
      </div>
    );
  }
}

export default VideoListItem;
