import { ComponentStory, ComponentMeta } from "@storybook/react";
import OrderDetailBox from "./OrderDetailBox";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "OrderDetailBox",
  component: OrderDetailBox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof OrderDetailBox>;

const Template: ComponentStory<typeof OrderDetailBox> = (args) => (
  <OrderDetailBox {...args} />
);

export const Test = Template.bind({});

Test.args = {
  dishName: 'Chicken Grill',
  description: 'It is one of the mot iconic and well-recognized fast food out there.',
  ingredients: 'Meat, vegetable',
  calories: 20,
  price: 16.66,
  picture: '/dishImg/chickenGrill.jpg',
  initDishNum: 0,
};