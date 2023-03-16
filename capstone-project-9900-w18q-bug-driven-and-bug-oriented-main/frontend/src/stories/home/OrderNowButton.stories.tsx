import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import OrderNowButton from "./OrderNowButton";


export default {
  title: "OrderNowButton",
  component: OrderNowButton,

  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof OrderNowButton>;

const Template: ComponentStory<typeof OrderNowButton> = (args) => (
  <OrderNowButton {...args} />
);

export const Test = Template.bind({});

Test.args = {
  confirm: false,
  isStaff: false,
};