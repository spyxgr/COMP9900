import { ComponentStory, ComponentMeta } from "@storybook/react";
import AddNumberBox from "./AddNumberBox";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: "AddNumberBox",
  component: AddNumberBox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof AddNumberBox>;

const Template: ComponentStory<typeof AddNumberBox> = (args) => (
  <AddNumberBox {...args} />
);

export const Test = Template.bind({});
Test.args = {
  initialNum: 0
};