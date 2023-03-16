import { ComponentStory, ComponentMeta } from "@storybook/react";
import CheckBillButton from "./CheckBillButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: "CheckBillButton",
  component: CheckBillButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof CheckBillButton>;

const Template: ComponentStory<typeof CheckBillButton> = (args) => (
  <CheckBillButton {...args} />
);

export const Test = Template.bind({});

Test.args = {

};