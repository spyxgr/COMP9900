import { ComponentStory, ComponentMeta } from "@storybook/react";
import CalorieTag from "./CalorieTag";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: "CalorieTag",
  component: CalorieTag,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof CalorieTag>;

const Template: ComponentStory<typeof CalorieTag> = (args) => (
  <CalorieTag {...args} />
);

export const Test = Template.bind({});

Test.args = {
  ceiling: 1000,
  count: 500,
};