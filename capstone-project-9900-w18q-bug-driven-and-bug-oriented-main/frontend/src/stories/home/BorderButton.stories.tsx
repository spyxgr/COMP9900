import { ComponentStory, ComponentMeta } from "@storybook/react";
import BorderButton from "./BorderButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "BorderButton",
  component: BorderButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof BorderButton>;

const Template: ComponentStory<typeof BorderButton> = (args) => (
  <BorderButton {...args} />
);

export const Test = Template.bind({});

Test.args = {
  number: '1',
  selected: false,
  doSomething:()=>{},
};