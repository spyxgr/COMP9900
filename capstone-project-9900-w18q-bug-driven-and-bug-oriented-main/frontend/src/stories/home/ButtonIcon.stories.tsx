import { ComponentStory, ComponentMeta } from "@storybook/react";
import ButtonIcon from "./ButtonIcon";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ButtonIcon",
  component: ButtonIcon,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ButtonIcon>;

const Template: ComponentStory<typeof ButtonIcon> = (args) => (
  <ButtonIcon {...args} />
);

export const Test = Template.bind({});

Test.args = {
  name: "table",
};