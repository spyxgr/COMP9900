import { ComponentStory, ComponentMeta } from "@storybook/react";
import StaffSelectButton from "./StaffSelectButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "StaffSelectButton",
  component: StaffSelectButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof StaffSelectButton>;

const Template: ComponentStory<typeof StaffSelectButton> = (args) => (
  <StaffSelectButton {...args} />
);

export const Test = Template.bind({});

Test.args = {
  role: 'kitchen staff',
  selected: false,

};