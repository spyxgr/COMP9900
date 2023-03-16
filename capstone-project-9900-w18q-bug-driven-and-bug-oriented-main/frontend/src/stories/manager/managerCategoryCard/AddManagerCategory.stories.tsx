import { ComponentStory, ComponentMeta } from "@storybook/react";
import AddManagerCategory from "./AddManagerCategory";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "AddManagerCategory",
  component: AddManagerCategory,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof AddManagerCategory>;

const Template: ComponentStory<typeof AddManagerCategory> = (args) => (
  <AddManagerCategory {...args} />
);

export const Test = Template.bind({});

Test.args = {
};