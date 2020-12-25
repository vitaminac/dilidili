import Task, { Props } from "./Task";

export default {
  component: Task,
  title: "Task",
};

const Template = (args: Props) => () => <Task {...args} />;

const DefaultArgs: Props = {
  task: {
    id: "1",
    title: "Test Task",
    state: "TASK_INBOX",
    updatedAt: new Date(2018, 0, 1, 9, 0),
  },
};

export const Default = Template(DefaultArgs);

export const Pinned = Template({
  task: {
    ...DefaultArgs.task,
    state: "TASK_PINNED",
  },
});

export const Archived = Template({
  task: {
    ...DefaultArgs.task,
    state: "TASK_ARCHIVED",
  },
});
