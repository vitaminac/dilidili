import React from "react";
import * as Config from "../config";
import reqwest from "reqwest";
import Loading from "./Loading";

class BangumiItem extends React.Component {
  render() {
    return (
      <div className="special-li">
        <div className="img floatleft">
          <img src={this.props.data.cover} />
        </div>
        <div className="info floatleft">
          <a
            href={Config.ROUTES.BANGUMI + "/" + this.props.data.season_id}
            className="title"
          >
            {this.props.data.title}
          </a>
          <div className="info">
            <div className="info-text floatleft">
              状态: {this.props.data.is_finish == "1" ? "已完结" : "连载中"}
            </div>
            <div className="info-text floatleft">
              集数: {this.props.data.total_count}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BangumiItem.defaultProps = {
  data: {
    title: "",
    cover: "",
    is_finish: "",
    season_id: "",
    total_count: "",
  },
};

export default class BangumiInfo extends React.Component {
  constructor(props) {
    super(props);
    this._seasonId = "";
    this.state = {
      loading: true,
      bagnumiInfo: null,
    };
  }
  _loadData() {
    var _this = this;
    reqwest({
      url:
        Config.API_BASE_URL + Config.BACKEND_API.BANGUMI_INFO + _this._seasonId,
      type: "json",
      method: "get",
      data: {},
      crossOrigin: true,
      error: function (err) {
        console.log("error:" + err);
      },
      success: function (data) {
        _this.props.cb(data.title);
        _this.setState({
          bangumiInfo: data,
          loading: false,
        });
      },
    });
  }

  componentDidMount() {
    this._seasonId = this.props.seasonId;
    this._loadData();
  }
  componentWillReceiveProps(nextProps) {
    this._seasonId = nextProps.seasonId;
    this.setState({
      loading: true,
    });
    this._loadData();
  }
  render() {
    var seasons = [];
    var actors = "";
    var videos = [];

    if (this.state.bangumiInfo != null) {
      for (var i = 0; i < this.state.bangumiInfo.seasons.length; i++) {
        seasons.push(
          <BangumiItem
            key={"bangumi-" + i}
            data={this.state.bangumiInfo.seasons[i]}
          />
        );
      }

      for (i = 0; i < this.state.bangumiInfo.actor.length; i++) {
        actors += this.state.bangumiInfo.actor[i].actor + "、 ";
      }

      for (i = 0; i < this.state.bangumiInfo.episodes.length; i++) {
        videos.push(
          <li key={"video-" + i} className="floatleft">
            <a
              href={
                Config.ROUTES.VIDEO +
                "/" +
                this.state.bangumiInfo.episodes[i].av_id
              }
              target="_blank"
            >
              <span className="bangumi-part-span">
                {this.state.bangumiInfo.episodes[i].index +
                  "." +
                  this.state.bangumiInfo.episodes[i].index_title}
              </span>
            </a>
          </li>
        );
      }
    }

    return (
      <div>
        {this.state.loading ? (
          <Loading />
        ) : (
          <div>
            <div className="bangumi-header">
              <h2>{this.state.bangumiInfo.title}</h2>
              <div className="bangumi-header-img">
                <img src={this.state.bangumiInfo.cover} />
              </div>
              <div className="bangumi-header-info">
                <p>
                  声优：<span>{actors}</span>
                </p>
                <br />
                <p>{this.state.bangumiInfo.evaluate}</p>
                <br />
                <p>
                  播放数：<span>{this.state.bangumiInfo.play_count}</span> |
                  弹幕数：<span>{this.state.bangumiInfo.danmaku_count}</span>
                </p>
              </div>
            </div>
            <div className="bangumi-season">{seasons}</div>
            <div className="clear"></div>
            <div className="bangumi-part">
              <p>剧集:</p>
              <ul>{videos}</ul>
              <div className="clear"></div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

BangumiInfo.defaultProps = {
  seasonId: 0,
  cb: function (content) {},
};
