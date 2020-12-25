import React, { FunctionComponent } from "react";
import TaskModel from "./TaskModel";
import Task from "./Task";

export type Props = {
  readonly loading: boolean;
  tasks: TaskModel[];
  /** Event to change the task to archived */
  readonly onArchiveTask?: (id: string) => void;
  /** Event to change the task to pinned */
  readonly onPinTask?: (id: string) => void;
};

function sortTask(tasks: TaskModel[]): TaskModel[] {
  return [
    ...tasks.filter((t) => t.state === "TASK_PINNED"),
    ...tasks.filter((t) => t.state !== "TASK_PINNED"),
  ];
}

const LoadingRow = (
  <div className="loading-item">
    <span className="glow-checkbox" />
    <span className="glow-text">
      <span>Loading</span> <span>cool</span> <span>state</span>
    </span>
  </div>
);

const TaskList: FunctionComponent<Props> = (props: Props) => {
  const events = {
    onPinTask: props.onPinTask,
    onArchiveTask: props.onArchiveTask,
  };

  if (props.loading) {
    return (
      <div className="list-items">
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }
  if (props.tasks.length === 0) {
    return (
      <div className="list-items">
        <div className="wrapper-message">
          <span className="icon-check" />
          <div className="title-message">You have no tasks</div>
          <div className="subtitle-message">Sit back and relax</div>
        </div>
      </div>
    );
  }
  return (
    <div className="list-items">
      {sortTask(props.tasks).map((task) => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
};

export default TaskList;
