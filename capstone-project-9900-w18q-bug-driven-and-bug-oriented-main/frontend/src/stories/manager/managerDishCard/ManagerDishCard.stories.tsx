import { ComponentStory, ComponentMeta } from "@storybook/react";
import ManagerDishCard from "./ManagerDishCard";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: "ManagerDishCard",
  component: ManagerDishCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ManagerDishCard>;

const Template: ComponentStory<typeof ManagerDishCard> = (args) => (
  <ManagerDishCard {...args} />
);

export const Test = Template.bind({});
Test.args = {
  dishName: 'Chicken Grill',
  description: 'It is one of the mot iconic and well-recognized fast food out there.',
  ingredients: 'Meat, vegetable',
  calories: 20,
  price: 16.66,
  picture: '/dishImg/chickenGrill.jpg',
  categoryName: 'Meat',
};