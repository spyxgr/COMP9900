import { ComponentStory, ComponentMeta } from "@storybook/react";
import ManagerOrderCard from "./ManagerOrderCard";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: "ManagerOrderCard",
  component: ManagerOrderCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ManagerOrderCard>;

const Template: ComponentStory<typeof ManagerOrderCard> = (args) => (
  <ManagerOrderCard {...args} />
);

export const Test = Template.bind({});

Test.args = {
  orderId: '123',
  table: '1',
  time: '2022-10-10-18:07:58',
  price: '20',
  itemList: [
    {
      dishName: 'meat',
      price: '20',
      status: 'yes',
    },
    {
      dishName: 'vegetable',
      price: '15',
      status: 'yes',
    },
    {
      dishName: 'drink',
      price: '4',
      status: 'yes',
    },
    {
      dishName: 'meat',
      price: '20',
      status: 'no',
    },
    {
      dishName: 'vegetable',
      price: '15',
      status: 'yes',
    },
    {
      dishName: 'drink',
      price: '4',
      status: 'no',
    },
    {
      dishName: 'drink',
      price: '4',
      status: 'yes',
    },
    {
      dishName: 'meat',
      price: '20',
      status: 'no',
    },
  ]
};