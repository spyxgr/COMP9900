import { ComponentStory, ComponentMeta } from "@storybook/react";
import MyTemplate from "./MyTemplate";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: "MyTemplate",
  component: MyTemplate,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof MyTemplate>;

const Template: ComponentStory<typeof MyTemplate> = (args) => (
  <MyTemplate {...args} />
);

export const Test = Template.bind({});

Test.args = {
  props1: "111",
  props2: "222",
  props3: true,
};