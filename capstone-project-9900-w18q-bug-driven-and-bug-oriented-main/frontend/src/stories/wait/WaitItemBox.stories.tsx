import { ComponentStory, ComponentMeta } from "@storybook/react";
import WaitItemBox from "./WaitItemBox";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "WaitItemBox",
  component: WaitItemBox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof WaitItemBox>;

const Template: ComponentStory<typeof WaitItemBox> = (args) => (
  <WaitItemBox {...args} />
);

export const Test = Template.bind({});

Test.args = {
  itemIndex: '123456',
  table: '10',
  dishName: 'Pizza',
};