import { Props } from "./TaskList";
import TaskModel from "./TaskModel";
import { DefaultTask, PinTask } from "./Task.stories.examples";

export const DefaultTaskList: TaskModel[] = [
  { ...DefaultTask, id: "1", title: "Task 1" },
  { ...DefaultTask, id: "2", title: "Task 2" },
  { ...DefaultTask, id: "3", title: "Task 3" },
  { ...DefaultTask, id: "4", title: "Task 4" },
  { ...DefaultTask, id: "5", title: "Task 5" },
  { ...DefaultTask, id: "6", title: "Task 6" },
];
export const DefaultTaskListProps: Props = {
  loading: false,
  tasks: DefaultTaskList,
};

export const WithPinnedTask: TaskModel[] = [
  ...DefaultTaskList.slice(0, 5),
  { ...PinTask, id: "6", title: "Task 6 (pinned)" },
];
export const WithPinnedTaskProps: Props = {
  loading: false,
  tasks: WithPinnedTask,
};

export const EmptyTaskList: TaskModel[] = [];
export const LoadingTaskListProps: Props = {
  loading: true,
  tasks: EmptyTaskList,
};
export const EmptyTaskListProps: Props = {
  tasks: EmptyTaskList,
  loading: false,
};
