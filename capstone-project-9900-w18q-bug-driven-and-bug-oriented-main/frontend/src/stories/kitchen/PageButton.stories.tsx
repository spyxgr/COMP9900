import { ComponentStory, ComponentMeta } from "@storybook/react";
import PageButton from "./PageButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "PageButton",
  component: PageButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof PageButton>;

const Template: ComponentStory<typeof PageButton> = (args) => (
  <PageButton {...args} />
);

export const Test = Template.bind({});

Test.args = {
  numberOfPage: 3,
  props2: "222",
  props3: true,
};