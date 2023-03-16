import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import OrderRecord from "./OrderRecord";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "OrderRecord",
  component: OrderRecord,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof OrderRecord>;

const Template: ComponentStory<typeof OrderRecord> = (args) => (
  <OrderRecord {...args} />
);

export const Test = Template.bind({});

Test.args = {
  table : 1,
  orderTime : '2022-10-10-18:07:58',
  status  : 'Completed',
  waitCount  : 0,
};