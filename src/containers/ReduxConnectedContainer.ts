import { connect } from "react-redux";
import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { ReduxStoreTree } from "../shapes";
import { tasksSlice } from "../slices";
import PureTaskList from "../components/TaskList";

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
