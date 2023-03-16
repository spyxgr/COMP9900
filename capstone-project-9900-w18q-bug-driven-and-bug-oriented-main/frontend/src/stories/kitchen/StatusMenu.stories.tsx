import { ComponentStory, ComponentMeta } from "@storybook/react";
import StatusMenu from "./StatusMenu";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: "StatusMenu",
  component: StatusMenu,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof StatusMenu>;

const Template: ComponentStory<typeof StatusMenu> = (args) => (
  <StatusMenu {...args} />
);

export const Test = Template.bind({});

Test.args = {

};