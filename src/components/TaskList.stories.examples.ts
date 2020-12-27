import { Props } from "./TaskList";
import { Task as TaskModel } from "../shapes";
import { DefaultTask, PinTask, ArchivedTask } from "./Task.stories.examples";

export const DefaultTaskList: TaskModel[] = [
  { ...DefaultTask, id: "1", title: "Task 1" },
  { ...DefaultTask, id: "2", title: "Task 2" },
  { ...DefaultTask, id: "3", title: "Task 3" },
  { ...DefaultTask, id: "4", title: "Task 4" },
  { ...DefaultTask, id: "5", title: "Task 5" },
  { ...DefaultTask, id: "6", title: "Task 6" },
];
export const DefaultTaskListProps: Props = {
  tasks: DefaultTaskList,
};

export const WithPinnedTask: TaskModel[] = [
  ...DefaultTaskList.slice(0, 5),
  { ...PinTask, id: "6", title: "Task 6 (pinned)" },
];
export const WithPinnedTaskProps: Props = {
  tasks: WithPinnedTask,
};

export const WithArchivedTask: TaskModel[] = [
  { ...ArchivedTask, id: "0", title: "Task 0 (archived)" },
  ...DefaultTaskList.slice(0, 5),
];
export const WithArchivedTaskProps: Props = {
  tasks: WithArchivedTask,
};

export const LoadingTaskListProps: Props = {
  tasks: undefined,
};

export const EmptyTaskList: TaskModel[] = [];
export const EmptyTaskListProps: Props = {
  tasks: EmptyTaskList,
};
