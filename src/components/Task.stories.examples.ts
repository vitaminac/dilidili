import { Task as TaskModel, TaskState } from "../shapes";

export const DefaultTask: TaskModel = {
  id: "1",
  title: "Test Task",
  state: TaskState.TASK_INBOX,
  updatedAt: new Date(2018, 0, 1, 9, 0),
};

export const PinTask: TaskModel = {
  ...DefaultTask,
  state: TaskState.TASK_PINNED,
};

export const ArchivedTask: TaskModel = {
  ...DefaultTask,
  state: TaskState.TASK_ARCHIVED,
};
