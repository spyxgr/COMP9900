import { ComponentStory, ComponentMeta } from "@storybook/react";
import OrderCard from "./OrderCard";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "OrderCard",
  component: OrderCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof OrderCard>;

const Template: ComponentStory<typeof OrderCard> = (args) => (
  <OrderCard {...args} />
);

export const Test = Template.bind({});

Test.args = {
  orderId: 123,
  table: 1,
  time: '2022-10-10-18:07:58',
  isRequest: 1,
  price: 20,
  itemList: [
    {
      dishName: 'meat',
      price: 20,
      status: 'Completed',
    },
    {
      dishName: 'vegetable',
      price: 15,
      status: 'Completed',
    },
    {
      dishName: 'drink',
      price: 4,
      status: 'Completed',
    },
    {
      dishName: 'meat',
      price: 20,
      status: 'no',
    },
    {
      dishName: 'vegetable',
      price: 15,
      status: 'Completed',
    },
    {
      dishName: 'drink',
      price: 4,
      status: 'no',
    },
    {
      dishName: 'drink',
      price: 4,
      status: 'Completed',
    },
    {
      dishName: 'meat',
      price: 20,
      status: 'no',
    },
  ]
};