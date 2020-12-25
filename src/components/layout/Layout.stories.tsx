import React from "react";
import { Story, Meta } from "@storybook/react";
import Layout from "./Layout";
export default {
  component: Layout,
  title: "Layout",
} as Meta;

export const Normal: Story<{}> = () => (
  <Layout>
    <div style={{ height: "30px", background: "black" }}>children</div>
  </Layout>
);
export const Large: Story<{}> = () => (
  <Layout>
    <div style={{ height: "1000px", background: "black" }}>children</div>
  </Layout>
);
