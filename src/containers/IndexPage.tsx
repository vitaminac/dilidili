import React from "react";
import AllRank from "../components/AllRank";
import { connect } from "react-redux";
import { createSelector, PayloadAction, ThunkDispatch } from "@reduxjs/toolkit";
import { ReduxStoreTree, VideoDetail } from "../shapes";
import PureVideoList from "../components/VideoList";
import PureIndexBanner from "../components/BannersSlider";
import { fetchHotVideos, fetchBanners } from "../actions";
import { Banner } from "../shapes";

const IndexHot = (function () {
  const mapStateToProps = (
    state: ReduxStoreTree,
    props: React.PropsWithoutRef<{}>
  ) => ({
    videos: createSelector(
      (state: ReduxStoreTree) => state.videos,
      (videos) =>
        Object.values(videos).sort((a, b) => b.playCount - a.playCount)
    )(state),
  });
  const mapDispatchToProps = (
    dispatch: ThunkDispatch<ReduxStoreTree, void, PayloadAction<VideoDetail[]>>
  ) => ({
    loadVideosList: () => dispatch(fetchHotVideos()),
  });
  return connect(mapStateToProps, mapDispatchToProps)(PureVideoList);
})();

const IndexBanner = (function () {
  const mapStateToProps = (state: ReduxStoreTree) => ({
    banners: createSelector(
      (state: ReduxStoreTree) => state.banners,
      (banners) => banners
    )(state),
  });
  const mapDispatchToProps = (
    dispatch: ThunkDispatch<ReduxStoreTree, void, PayloadAction<Banner[]>>
  ) => ({
    loadBanners: () => dispatch(fetchBanners()),
  });
  return connect(mapStateToProps, mapDispatchToProps)(PureIndexBanner);
})();

export default class IndexPage extends React.Component {
  componentDidMount() {
    document.title = "BH5 | 首页";
  }

  render() {
    return (
      <div id="index-head-area" className="area">
        <div className="area-inner">
          <div className="left-block floatleft">
            <IndexBanner />
          </div>
          <div className="right-block floatleft">
            <IndexHot />
            <div className="clear"></div>
          </div>
          <div className="clear"></div>
        </div>
        <AllRank />
      </div>
    );
  }
}
