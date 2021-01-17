import { ThunkAction, PayloadAction } from "@reduxjs/toolkit";
import { ReduxStoreTree, VideoDetail } from "./shapes";
import { videosSlice } from "./reducers";

export const fetchHotVideos = (): ThunkAction<
  void,
  ReduxStoreTree,
  unknown,
  PayloadAction<VideoDetail[]>
> => async (dispatch, getState) => {
  dispatch(
    videosSlice.actions.mergeVideos([
      {
        videoId: 1,
        title: "史莱姆的故事",
        cover: "https://i.imgur.com/nWvPmbU.jpg",
        uploader: "test",
        playCount: 99,
      },
      {
        videoId: 2,
        title: "蜘蛛子的故事",
        cover: "https://i.imgur.com/nkeAy9x.jpg",
        uploader: "test",
        playCount: 80,
      },
      {
        videoId: 3,
        title: "Overload",
        cover: "https://i.imgur.com/e0XzYz8.jpg",
        uploader: "test",
        playCount: 89,
      },
      {
        videoId: 4,
        title: "齐木楠雄",
        cover: "https://i.imgur.com/YVr2Qj0.jpg",
        uploader: "test",
        playCount: 72,
      },
      {
        videoId: 5,
        title: "灵能爆发",
        cover: "https://i.imgur.com/OlWclp1.jpg",
        uploader: "test",
        playCount: 68,
      },
      {
        videoId: 6,
        title: "智障女神",
        cover: "https://i.imgur.com/Ll8itdv.jpg",
        uploader: "test",
        playCount: 70,
      },
      {
        videoId: 0,
        title: "no debe mostrar",
        cover: "",
        uploader: "test",
        playCount: 0,
      },
    ])
  );
};
