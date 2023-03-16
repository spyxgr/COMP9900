import { ComponentStory, ComponentMeta } from "@storybook/react";
import NavBar from "./NavBar";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "NavBar",
  component: NavBar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = (args) => (
  <NavBar {...args} />
);

export const Test = Template.bind({});

Test.args = {
  obj: [],
  show: 'request',
  role: 'customer',
};