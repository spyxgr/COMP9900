import { ComponentStory, ComponentMeta } from "@storybook/react";
import ManagerAddKey from "./ManagerAddKey";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ManagerAddKey",
  component: ManagerAddKey,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ManagerAddKey>;

const Template: ComponentStory<typeof ManagerAddKey> = (args) => (
  <ManagerAddKey {...args} />
);

export const Test = Template.bind({});

Test.args = {
};