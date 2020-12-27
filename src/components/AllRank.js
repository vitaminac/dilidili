import React from "react";
import * as Config from "../config";
import reqwest from "reqwest";

class VideoItem extends React.Component {
  render() {
    var linkUrl = Config.ROUTES.videos + "/" + this.props.data.param;
    return (
      <div className="video-block floatleft">
        <a href={linkUrl} target="_blank" className="video-block-main">
          <img src={this.props.data.cover} />
        </a>
        <div className="video-block-time">弹幕: {this.props.data.danmaku}</div>
        <a href={linkUrl} target="_blank" className="video-block-info">
          {this.props.data.title}
        </a>
        <div className="video-block-info-hidden">
          <div className="left floatleft">播放: {this.props.data.play}</div>
          <div className="right floatright">回复: {this.props.data.reply}</div>
        </div>
      </div>
    );
  }
}

VideoItem.defaultProps = {
  data: {
    title: "",
    cover: "",
    param: "",
    name: "",
    play: "",
    reply: "",
    danmaku: "",
    favourite: "",
  },
};

class VideoBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  _loadData(tid) {
    var _this = this;

    var labelName = Config.sort_tags[tid];

    reqwest({
      url: Config.API_BASE_URL + Config.ROUTES.INDEX_RANK + tid,
      type: "json",
      method: "get",
      crossOrigin: true,
      error: function (err) {
        console.log("error");
      },
      success: function (resp) {
        _this.setState({
          videoList: resp.videos,
          labelName: labelName,
        });
      },
    });
  }
  getInitialState() {
    return {
      videoList: [],
      labelName: "",
    };
  }
  componentDidMount() {
    this._loadData(this.props.tid);
  }
  render() {
    var renderVideos = [];
    for (var i in this.state.videoList) {
      renderVideos.push(<VideoItem key={i} data={this.state.videoList[i]} />);
      if (i == 9) {
        break;
      }
    }
    return (
      <div className="area">
        <div className="area-inner">
          <div className="area-banner">
            <a className="area-banner-ch">
              <h3>{this.state.labelName}</h3>
              <i className="area-banner-line-left"></i>
            </a>
            <i className="area-banner-line-right"></i>
            <i className="area-banner-line-circle"></i>
          </div>
          <div className="list-video-block floatleft">{renderVideos}</div>
          <div className="clear"></div>
        </div>
      </div>
    );
  }
}

export default class AllRank extends React.Component {
  render() {
    var renderList = [];
    for (var i in Config.index_sorts) {
      var id = Config.index_sorts[i];
      renderList.push(<VideoBlock key={"list-" + id} tid={id} />);
    }
    return <div>{renderList}</div>;
  }
}
