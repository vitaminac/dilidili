import React from "react";
import { Banner } from "../shapes";

class BannerBlock extends React.Component<{
  bannerList: Banner[];
}> {
  componentDidMount() {
    $(function () {
      const dom: any = $(".block-banner");
      dom.unslider({
        animation: "horizontal",
        autoplay: true,
        arrows: false,
        keys: false,
      });
    });
  }

  render() {
    return (
      <div className="unslider-banner floatleft">
        <div className="block-banner index-banner" ref="index_banner">
          <ul>
            {this.props.bannerList.map((banner, index) => (
              <li key={index}>
                <a href={banner.url}>
                  <img src={banner.img} alt="banner" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}

type IndexBannerProps = {
  banners: Banner[];
  loadBanners: () => void;
};

export default class IndexBanner extends React.Component<IndexBannerProps> {
  componentDidMount() {
    this.props.loadBanners();
  }

  render() {
    return this.props.banners.length !== 0 ? (
      <BannerBlock bannerList={this.props.banners} />
    ) : (
      <div></div>
    );
  }
}
