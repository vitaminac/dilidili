import { connect } from "react-redux";
import { Dispatch } from "redux";
import { PayloadAction, ThunkDispatch } from "@reduxjs/toolkit";
import { ReduxStoreTree, VideoDetail } from "../shapes";
import { tasksSlice } from "../reducers";
import PureTaskList from "../components/TaskList";
import PureVideoList from "../components/VideoList";
import { fetchHotVideos } from "../actions";

export const TaskList = connect(
  (state: ReduxStoreTree) => ({
    tasks: state.tasks,
  }),
  (dispatch: Dispatch<PayloadAction<string>>) => ({
    onArchiveTask: (id: string) => dispatch(tasksSlice.actions.archiveTask(id)),
    onPinTask: (id: string) => dispatch(tasksSlice.actions.pinTask(id)),
  })
)(PureTaskList);

export const IndexHot = connect(
  (state: ReduxStoreTree) => ({
    videos: Object.values(state.videos),
  }),
  (
    dispatch: ThunkDispatch<ReduxStoreTree, void, PayloadAction<VideoDetail[]>>
  ) => ({
    loadVideosList: () => dispatch(fetchHotVideos()),
  })
)(PureVideoList);
