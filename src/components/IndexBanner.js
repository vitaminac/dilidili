import React from "react";
import reqwest from "reqwest";
import $ from "jquery";
import { API_BASE_URL, BACKEND_API } from "../config";

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  render() {
    var renderBanner = [];
    for (var i = 0; i < this.props.bannerList.length; i++) {
      var data = this.props.bannerList[i];
      renderBanner.push(
        <li key={i}>
          <a href={data.url} target="_blank">
            <img src={data.pic} />
          </a>
        </li>
      );
    }
    return (
      <div className="unslider-banner floatleft">
        <div className="block-banner index-banner" ref="index_banner">
          <ul>{renderBanner}</ul>
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}

Banner.defaultProps = {
  bannerList: [],
};

class BannerBlock extends React.Component {
  _loadBanner() {
    $(".block-banner").unslider({
      animation: "horizontal",
      autoplay: true,
      arrows: false,
      keys: false,
    });
  }
  componentDidMount() {
    this._loadBanner();
  }
  render() {
    return <Banner bannerList={this.props.bannerList} />;
  }
}

BannerBlock.defaultProps = {
  bannerList: [],
};

export default class IndexBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  _loadData() {
    var _this = this;
    reqwest({
      url: API_BASE_URL + BACKEND_API.BANNER,
      type: "json",
      method: "get",
      crossOrigin: true,
      error: function (err) {
        console.log("error");
      },
      success: function (data) {
        _this.setState({
          banners: data,
        });
      },
    });
  }
  componentDidMount() {
    this._loadData();
  }
  getInitialState() {
    return {
      banners: [],
    };
  }
  render() {
    return this.state.banners.length !== 0 ? (
      <BannerBlock bannerList={this.state.banners} />
    ) : (
      <div></div>
    );
  }
}
