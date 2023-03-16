import { ComponentStory, ComponentMeta } from "@storybook/react";
import SubmitButton from "./SubmitButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "SubmitButton",
  component: SubmitButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof SubmitButton>;

const Template: ComponentStory<typeof SubmitButton> = (args) => (
  <SubmitButton {...args} />
);

export const Test = Template.bind({});

Test.args = {
  shown: true,
};