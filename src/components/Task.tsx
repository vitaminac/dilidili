import React, { FunctionComponent } from "react";
import TaskModel from "./TaskModel";

export type Props = {
  readonly task: TaskModel;
  /** Event to change the task to archived */
  readonly onArchiveTask?: (id: string) => void;
  /** Event to change the task to pinned */
  readonly onPinTask?: (id: string) => void;
};

const Task: FunctionComponent<Props> = (props: Props) => (
  <div className={`list-item ${props.task.state}`}>
    <label className="checkbox">
      <input
        type="checkbox"
        defaultChecked={props.task.state === "TASK_ARCHIVED"}
        disabled={true}
        name="checked"
      />
      <span
        className="checkbox-custom"
        onClick={() => props.onArchiveTask?.(props.task.id)}
      />
    </label>
    <div className="title">
      <input
        type="text"
        value={props.task.title}
        readOnly={true}
        placeholder="Input title"
      />
    </div>

    <div className="actions" onClick={(event) => event.stopPropagation()}>
      {props.task.state !== "TASK_ARCHIVED" && (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a onClick={() => props?.onPinTask?.(props.task.id)}>
          <span className={`icon-star`} />
        </a>
      )}
    </div>
  </div>
);

export default Task;
