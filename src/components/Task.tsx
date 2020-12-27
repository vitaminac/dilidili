import React, { FunctionComponent } from "react";
import { Task as TaskModel, TaskState } from "../shapes";
import style from "./Task.module.css";

export type Props = {
  readonly task: TaskModel;
  /** Event to change the task to archived */
  readonly onArchiveTask?: (id: string) => void;
  /** Event to change the task to pinned */
  readonly onPinTask?: (id: string) => void;
};

const Task: FunctionComponent<Props> = (props: Props) => (
  <div className="list-item">
    <label className="checkbox">
      <input
        type="checkbox"
        defaultChecked={props.task.state === TaskState.TASK_ARCHIVED}
        disabled={true}
        name="checked"
      />
      <span
        className={`${style.checkbox} ${
          props.task.state === TaskState.TASK_ARCHIVED ? style.checked : ""
        }`}
        onClick={() => props.onArchiveTask?.(props.task.id)}
      />
    </label>
    <div className="title">
      <input
        className={`${
          props.task.state === TaskState.TASK_ARCHIVED ? style.archived : ""
        }`}
        type="text"
        value={props.task.title}
        readOnly={true}
        placeholder="Input title"
      />
    </div>

    <div className="actions" onClick={(event) => event.stopPropagation()}>
      {props.task.state !== TaskState.TASK_ARCHIVED && (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a onClick={() => props?.onPinTask?.(props.task.id)}>
          <span
            className={`icon-star ${
              props.task.state === TaskState.TASK_PINNED ? style.pinned : ""
            }`}
          />
        </a>
      )}
    </div>
  </div>
);

export default Task;
