import { ComponentStory, ComponentMeta } from "@storybook/react";
import AskHelpButton from "./AskHelpButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: "AskHelpButton",
  component: AskHelpButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof AskHelpButton>;

const Template: ComponentStory<typeof AskHelpButton> = (args) => (
  <AskHelpButton {...args} />
);

export const Test = Template.bind({});
Test.args = {
};