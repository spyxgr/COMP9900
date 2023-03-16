import { ComponentStory, ComponentMeta } from "@storybook/react";
import Logout from "./Logout";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: "Logout",
  component: Logout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Logout>;

const Template: ComponentStory<typeof Logout> = (args) => (
  <Logout {...args} />
);

export const Test = Template.bind({});

Test.args = {
};