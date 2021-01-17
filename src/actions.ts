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
        playCount: 15,
      },
    ])
  );
};
