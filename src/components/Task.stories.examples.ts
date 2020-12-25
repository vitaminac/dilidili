import TaskModel from "./TaskModel";

export const DefaultTask: TaskModel = {
  id: "1",
  title: "Test Task",
  state: "TASK_INBOX",
  updatedAt: new Date(2018, 0, 1, 9, 0),
};

export const PinTask: TaskModel = {
  ...DefaultTask,
  state: "TASK_PINNED",
};

export const ArchivedTask: TaskModel = {
  ...DefaultTask,
  state: "TASK_ARCHIVED",
};
