import React from "react";
import $ from "jquery";
import reqwest from "reqwest";
import Pager from "./Pager";
import Loading from "./Loading";
import { ROUTES, API_BASE_URL } from "../config";

class VideoItem extends React.Component {
  static defaultProps = {
    data: {
      title: "",
      cover: "",
      param: "",
      desc: "",
      author: "",
      duration: "",
      play: 0,
      danmaku: 0,
    },
  };

  render() {
    var date = new Date();
    date.setTime(this.props.data.pubdate * 1000);

    var linkUrl = ROUTES.VIDEO + "/" + this.props.data.param;
    return (
      <div className="search-video-block floatleft">
        <a href={linkUrl} target="_blank">
          <div className="img">
            <img src={this.props.data.cover} />
            <span className="time">{this.props.data.duration}</span>
          </div>
        </a>
        <div className="other-info">
          <a href={linkUrl} target="_blank" className="title">
            {this.props.data.title}
          </a>
          <div className="info floatleft">
            <div className="info-text floatleft">
              播放: {this.props.data.play}
            </div>
            <div className="info-text floatleft">
              {" "}
              弹幕：{this.props.data.danmaku}
            </div>
            <div className="info-text floatleft">
              Up: {this.props.data.author}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class UserItem extends React.Component {
  static defaultProps = {
    data: {
      title: "",
      cover: "",
      param: "",
      fans: "",
      sign: "",
    },
  };

  render() {
    var date = new Date();
    date.setTime(this.props.data.pubdate * 1000);

    var linkUrl = "#";
    return (
      <div className="search-video-block floatleft">
        <a href={linkUrl} target="_blank">
          <div className="img">
            <img src={this.props.data.cover} />
          </div>
        </a>
        <div className="other-info">
          <a href={linkUrl} target="_blank" className="title">
            {this.props.data.title}
          </a>
          <div className="info floatleft">
            <div className="info-text floatleft">
              粉丝: {this.props.data.fans}
            </div>
            <div className="info-text floatleft">{this.props.data.sign}</div>
          </div>
        </div>
      </div>
    );
  }
}

class BangumiItem extends React.Component {
  static defaultProps = {
    data: {
      title: "",
      cover: "",
      param: "",
      cat_desc: "",
      total_count: 0,
    },
  };
  render() {
    return (
      <div className="special-li floatleft">
        <div className="img floatleft">
          <img src={this.props.data.cover} />
        </div>
        <div className="info floatleft">
          <a
            href={ROUTES.BANGUMI + "/" + this.props.data.param}
            target="_blank"
            className="title"
          >
            {this.props.data.title}
          </a>
          <p className="desc">{this.props.data.cat_desc}</p>
          <div className="info">
            <div className="info-text floatleft">
              集数: {this.props.data.total_count}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Topic extends React.Component {
  static defaultProps = {
    data: {
      arcurl: "",
      author: "",
      click: 0,
      cover: "",
      description: "",
      favourite: 0,
      keyword: "",
      mid: 0,
      pubdate: 0,
      review: 0,
      title: "",
      tp_id: 0,
      tp_type: 0,
      update: 0,
    },
  };

  render() {
    return <div></div>;
  }
}

class SearchBlock extends React.Component {
  _handleClick() {
    var value = this.refs.search_content.value;
    this.props.searchCallBack(value);
  }
  componentDidUpdate(prevProps, prevState) {
    //input value
    this.refs.search_content.setAttribute("value", this.props.keyword);
  }
  static defaultProps = {
    keyword: "",
    searchCallBack: function (keyword) {
      console.log(keyword);
    },
  };
  render() {
    return (
      <div className="search-block">
        <div className="input-wrap floatleft">
          <input
            name="content"
            ref="search_content"
            className="search-content"
            placeholder="这里搜索"
          />
        </div>
        <div className="search-btn floatleft" onClick={this._handleClick}>
          <span>搜索</span>
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}

export default class SearchContent extends React.Component {
  _searchType = "video";
  _page = 1;
  _order = "totalrank";
  _keyword = "";

  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  _loadData() {
    this.setState({
      loading: true,
    });
    var _this = this;
    reqwest({
      url: API_BASE_URL,
      type: "json",
      method: "get",
      data: {
        keyword: _this._keyword,
        page_size: 20,
        page: _this._page,
        order: _this._order,
      },
      crossOrigin: true,
      error: function (err) {
        console.log("error:" + err);
      },
      success: function (data) {
        _this.props.cb(_this._keyword);
        _this.setState({
          list: data,
          all_page: 500,
          loading: false,
        });
      },
    });
  }
  _getSearch(content) {
    this._keyword = content;
    this._loadData();
  }
  _changeOrder(order) {
    this._order = order;
    this._loadData();
  }
  _changePage(page) {
    this._page = page;
    this._loadData();
    $("body,html").animate({ scrollTop: 0 }, 700);
  }
  _changeType(type) {
    this._searchType = type;
    this._page = 1;
    this._loadData();
  }
  getInitialState() {
    return {
      list: [],
      all_page: 0,
      loading: true,
    };
  }
  static defaultProps = {
    keyword: "",
    allPage: 20,
    cb: function (content) {},
  };
  componentDidMount() {
    this._keyword = this.props.keyword;
    this._loadData();
  }
  componentWillReceiveProps(nextProps) {
    this._keyword = nextProps.keyword;
    this._loadData();
    this.setState({
      loading: true,
    });
  }
  render() {
    var renderArr = [];

    for (var i = 0; i < this.state.list.length; i++) {
      switch (this._searchType) {
        case "video": {
          renderArr.push(
            <VideoItem key={"video-" + i} data={this.state.list[i]} />
          );
          break;
        }
        case "bangumi": {
          renderArr.push(
            <BangumiItem key={"bangumi-" + i} data={this.state.list[i]} />
          );
          break;
        }
        case "user": {
          renderArr.push(
            <UserItem key={"user-" + i} data={this.state.list[i]} />
          );
        }
      }
    }

    return (
      <div>
        <div className="search-info">
          <div className="search-select-block">
            <ul className="wrap floatleft">
              <li
                className={
                  (this._searchType === "video" ? "active" : "") +
                  " sub floatleft"
                }
                onClick={this._changeType.bind(null, "video")}
              >
                视频
              </li>
              <li
                className={
                  (this._searchType === "bangumi" ? "active" : "") +
                  " sub floatleft"
                }
                onClick={this._changeType.bind(null, "bangumi")}
              >
                番剧
              </li>
              <li
                className={
                  (this._searchType === "user" ? "active" : "") +
                  " sub floatleft"
                }
                onClick={this._changeType.bind(null, "user")}
              >
                UP主
              </li>
            </ul>
            <div className="clear"></div>
          </div>

          {this._searchType === "video" ? (
            <div className="search-fliter-block">
              <ul className="wrap floatleft">
                <li
                  onClick={this._changeOrder.bind(null, "totalrank")}
                  className={
                    (this._order === "totalrank" ? "active" : "") +
                    " sub floatleft"
                  }
                >
                  综合排序
                </li>
                <li
                  onClick={this._changeOrder.bind(null, "click")}
                  className={
                    (this._order === "click" ? "active" : "") + " sub floatleft"
                  }
                >
                  最多点击
                </li>
                <li
                  onClick={this._changeOrder.bind(null, "pubdate")}
                  className={
                    (this._order === "pubdate" ? "active" : "") +
                    " sub floatleft"
                  }
                >
                  最新发布
                </li>
                <li
                  onClick={this._changeOrder.bind(null, "dm")}
                  className={
                    (this._order === "dm" ? "active" : "") + " sub floatleft"
                  }
                >
                  弹幕
                </li>
              </ul>
              <div className="clear"></div>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        {this.state.loading ? (
          <Loading />
        ) : (
          <div className="area">
            <div className="search-result-content">
              {renderArr}
              <div className="clear"></div>
              <div className="search-pager">
                <Pager
                  allPage={this.state.all_page}
                  nowPage={this._page}
                  pageCallBack={this._changePage}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
