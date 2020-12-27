import { connect } from "react-redux";
import { Dispatch } from "redux";
import { PayloadAction } from "@reduxjs/toolkit";
import { ReduxStoreTree } from "../shapes";
import { tasksSlice } from "../reducers";
import PureTaskList from "../components/TaskList";

const mapStateToProps = (state: ReduxStoreTree) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = (dispatch: Dispatch<PayloadAction<string>>) => ({
  onArchiveTask: (id: string) => dispatch(tasksSlice.actions.archiveTask(id)),
  onPinTask: (id: string) => dispatch(tasksSlice.actions.pinTask(id)),
});

export const TaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureTaskList);
