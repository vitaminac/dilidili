import React from "react";
import { Story, Meta } from "@storybook/react";
import VideoListItem from "./VideoListItem";
import { VideoDetail } from "../shapes";
import { DefaultVideo } from "./VideoListItem.stories.examples";

export default {
  component: VideoListItem,
  title: "dilidili/VideoListItem",
} as Meta;

const Template: Story<VideoDetail> = (args) => <VideoListItem {...args} />;

export const Default = Template.bind({});
Default.args = DefaultVideo;
