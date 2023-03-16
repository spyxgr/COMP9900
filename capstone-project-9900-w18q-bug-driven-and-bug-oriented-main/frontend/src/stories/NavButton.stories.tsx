import { ComponentStory, ComponentMeta } from "@storybook/react";
import NavButton from "./NavButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "NavButton",
  component: NavButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof NavButton>;

const Template: ComponentStory<typeof NavButton> = (args) => (
  <NavButton {...args} />
);

export const Test = Template.bind({});

Test.args = {
  name: "111",
  id: "1",
  number: 0,
  item: 'hot',
  selected: true,
};