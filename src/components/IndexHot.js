import { ROUTES } from "../config";
var React = require("react");
var Config = require("../config");
var reqwest = require("reqwest");

class VideoItem extends React.Component {
  render() {
    var linkUrl = ROUTES.VIDEO + "/" + this.props.data.param;
    return (
      <div className="video-block-mask floatleft">
        <a href={linkUrl} target="_blank">
          <div className="video-block-mask-preview">
            <img src={this.props.data.cover} />
          </div>
          <div className="video-block-mask-mask"></div>

          <div className="video-block-mask-info">
            <div className="title">{this.props.data.title}</div>
            <div className="up">up主：{this.props.data.name}</div>
            <div className="play">播放：{this.props.data.play}</div>
          </div>
        </a>
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

export default class IndexHot extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  _loadData() {
    var _this = this;
    reqwest({
      url: Config.API_BASE_URL + Config.ROUTES.TOP_RANK,
      type: "json",
      method: "get",
      crossOrigin: true,
      error: function (err) {
        console.log("error");
      },
      success: function (data) {
        _this.setState({
          top: data,
        });
      },
    });
  }
  componentDidMount() {
    this._loadData();
  }
  getInitialState() {
    return {
      top: [],
    };
  }
  render() {
    var renderVideos = [];
    var count = 0;
    for (var i in this.state.top) {
      if (count < 6) {
        if (i != "num") {
          renderVideos.push(<VideoItem key={i} data={this.state.top[i]} />);
        }
      } else {
        break;
      }
      count++;
    }
    return (
      <div className="right-block floatleft">
        {renderVideos}
        <div className="clear"></div>
      </div>
    );
  }
}
