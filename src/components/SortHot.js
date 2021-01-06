import React from "react";
import * as Config from "../config";
import reqwest from "reqwest";

class VideoItem extends React.Component {
  render() {
    var linkUrl = Config.ROUTES.VIDEO + "/" + this.props.data.param;
    return (
      <div className="side-video-item">
        <div className="left floatleft">
          <img className="lazy" src={this.props.data.cover} />
        </div>
        <div className="right floatleft">
          <a href={linkUrl} target="_blank" className="title">
            {this.props.data.title}
          </a>
          <a href={linkUrl} target="_blank" className="up">
            {this.props.data.name}
          </a>
          <div className="info">
            <div className="info-text floatleft">
              播放: {this.props.data.play}
            </div>
            <div className="info-text floatright">
              弹幕: {this.props.data.danmaku}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

VideoItem.defaultProps = {
  title: "",
  cover: "",
  param: "",
  name: "",
  play: "",
  reply: "",
  danmaku: "",
  favourite: "",
};

export default class SortHot extends React.Component {
  constructor(props) {
    super(props);
    this._order = "hot";
    this.state = {
      videoList: [],
    };
  }

  _loadData() {
    var _this = this;
    reqwest({
      url: Config.API_BASE_URL + Config.BACKEND_API.TOP_RANK,
      type: "json",
      method: "get",
      crossOrigin: true,
      error: function (err) {
        console.log("error");
      },
      success: function (data) {
        _this.setState({
          videoList: data,
        });
      },
    });
  }

  componentDidMount() {
    this._loadData();
  }
  render() {
    var renderList = [];

    for (var i in this.state.videoList) {
      if (i != "num") {
        renderList.push(
          <VideoItem key={"hot-" + i} data={this.state.videoList[i]} />
        );
      }
    }

    return (
      <div className="sort-right floatleft">
        <div className="banner">
          <p>热门排行</p>
        </div>
        <div className="side-video-list">{renderList}</div>
      </div>
    );
  }
}

SortHot.defaultProps = {
  tid: 0,
};
