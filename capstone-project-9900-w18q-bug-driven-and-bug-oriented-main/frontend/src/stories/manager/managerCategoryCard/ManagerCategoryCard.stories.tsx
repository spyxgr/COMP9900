import { ComponentStory, ComponentMeta } from "@storybook/react";
import ManagerCategoryCard from "./ManagerCategoryCard";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ManagerCategoryCard",
  component: ManagerCategoryCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ManagerCategoryCard>;

const Template: ComponentStory<typeof ManagerCategoryCard> = (args) => (
  <ManagerCategoryCard {...args} />
);

export const Test = Template.bind({});

Test.args = {
  categoryId: 111,
  categoryName: "meat",
  lastModified: '2022-10-10-18:07:58',
};