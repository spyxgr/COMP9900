import { ComponentStory, ComponentMeta } from "@storybook/react";
import BigButton from "./BigButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "BigButton",
  component: BigButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof BigButton>;

const Template: ComponentStory<typeof BigButton> = (args) => (
  <BigButton {...args} />
);

export const Test = Template.bind({});

Test.args = {
  name: "111",
  confirm: true,
};