import { ComponentStory, ComponentMeta } from "@storybook/react";
import ManagerDishModal from "./ManagerDishModal";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ManagerDishModal",
  component: ManagerDishModal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ManagerDishModal>;

const Template: ComponentStory<typeof ManagerDishModal> = (args) => (
  <ManagerDishModal {...args} />
);

export const Test = Template.bind({});

Test.args = {
  editOpen: false,
  categoryName: 'Meat',
  dishName: 'Title name',
  description: 'Within 150 words',
  ingredients: 'Within 150 words',
  calories: '0',
  price: '0.00',
  newPictureName: 'picture',
};