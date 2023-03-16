import { ComponentStory, ComponentMeta } from "@storybook/react";
import ManagerKeyCard from "./ManagerKeyCard";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ManagerKeyCard",
  component: ManagerKeyCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ManagerKeyCard>;

const Template: ComponentStory<typeof ManagerKeyCard> = (args) => (
  <ManagerKeyCard {...args} />
);

export const Test = Template.bind({});

Test.args = {
  lastModified: '2022-10-10-18:07:58',
};