import { ComponentStory, ComponentMeta } from "@storybook/react";
import OrderIcon from "./OrderIcon";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: "OrderIcon",
  component: OrderIcon,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof OrderIcon>;

const Template: ComponentStory<typeof OrderIcon> = (args) => (
  <OrderIcon {...args} />
);

export const Test = Template.bind({});

Test.args = {
  number: 1,
  shown: true,
};