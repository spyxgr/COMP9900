import { ComponentStory, ComponentMeta } from "@storybook/react";
import PriceTag from "./PriceTag";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: "PriceTag",
  component: PriceTag,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof PriceTag>;

const Template: ComponentStory<typeof PriceTag> = (args) => (
  <PriceTag {...args} />
);

export const Test = Template.bind({});

Test.args = {
  price: 0,
};