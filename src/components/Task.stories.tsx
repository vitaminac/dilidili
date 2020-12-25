import React from "react";
import { Story, Meta } from "@storybook/react";
import Task, { Props } from "./Task";
import { DefaultTask, PinTask, ArchivedTask } from "./Task.stories.examples";

export default {
  component: Task,
  title: "Task",
} as Meta;

const Template: Story<Props> = (args) => <Task {...args} />;

export const Default = Template.bind({});
Default.args = {
  task: DefaultTask,
};

export const Pinned = Template.bind({});
Pinned.args = {
  task: PinTask,
};

export const Archived = Template.bind({});
Archived.args = {
  task: ArchivedTask,
};
