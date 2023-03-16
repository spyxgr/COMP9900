import { ComponentStory, ComponentMeta } from "@storybook/react";
import ShowService from "./ShowService";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ShowService",
  component: ShowService,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ShowService>;

const Template: ComponentStory<typeof ShowService> = (args) => (
  <ShowService {...args} />
);

export const Test = Template.bind({});

Test.args = {
  table: 1,
  startTime: '2022-10-10-18:07:58',
};