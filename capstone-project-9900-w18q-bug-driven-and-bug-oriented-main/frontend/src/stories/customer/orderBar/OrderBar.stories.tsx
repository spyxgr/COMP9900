import { ComponentStory, ComponentMeta } from "@storybook/react";
import OrderBar from "./OrderBar";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: "OrderBar",
  component: OrderBar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof OrderBar>;

const Template: ComponentStory<typeof OrderBar> = (args) => (
  <OrderBar {...args} />
);

export const Test = Template.bind({});

Test.args = {
  number: 2,
  price: 22.36,
  haveItem: true,
  canSubmit: true,
  ceilingOfCal: 1000,
  countOfCal: 500,
};