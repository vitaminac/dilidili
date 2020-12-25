import React from "react";
import { Story, Meta } from "@storybook/react";
import TaskList, { Props } from "./TaskList";
import {
  DefaultTaskListProps,
  WithPinnedTaskProps,
  LoadingTaskListProps,
  EmptyTaskListProps,
} from "./TaskList.stories.examples";

export default {
  component: TaskList,
  title: "TaskList",
  decorators: [(story) => <div style={{ padding: "3rem" }}>{story()}</div>],
} as Meta;

const Template: Story<Props> = (args) => <TaskList {...args} />;

export const Default = Template.bind({});
Default.args = DefaultTaskListProps;

export const WithPinnedTask = Template.bind({});
WithPinnedTask.args = WithPinnedTaskProps;

export const Loading = Template.bind({});
Loading.args = LoadingTaskListProps;

export const Empty = Template.bind({});
Empty.args = EmptyTaskListProps;
