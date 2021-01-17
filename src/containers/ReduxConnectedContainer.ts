import { connect } from "react-redux";
import {
  createSelector,
  Dispatch,
  PayloadAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { ReduxStoreTree, VideoDetail } from "../shapes";
import { tasksSlice } from "../reducers";
import PureTaskList from "../components/TaskList";
import PureVideoList from "../components/VideoList";
import { fetchHotVideos } from "../actions";

export const TaskList = (function () {
  const mapStateToProps = (
    state: ReduxStoreTree,
    props: React.PropsWithoutRef<{}>
  ) => ({
    tasks: state.tasks,
  });
  const mapDispatchToProps = (dispatch: Dispatch<PayloadAction<string>>) => ({
    onArchiveTask: (id: string) => dispatch(tasksSlice.actions.archiveTask(id)),
    onPinTask: (id: string) => dispatch(tasksSlice.actions.pinTask(id)),
  });
  return connect(mapStateToProps, mapDispatchToProps)(PureTaskList);
})();

export const IndexHot = (function () {
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
