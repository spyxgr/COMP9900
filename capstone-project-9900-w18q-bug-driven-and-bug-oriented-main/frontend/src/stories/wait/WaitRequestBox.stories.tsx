import { ComponentStory, ComponentMeta } from "@storybook/react";
import WaitRequestBox from "./WaitRequestBox";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "WaitRequestBox",
  component: WaitRequestBox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof WaitRequestBox>;

const Template: ComponentStory<typeof WaitRequestBox> = (args) => (
  <WaitRequestBox {...args} />
);

export const Test = Template.bind({});

Test.args = {
  table: '10',
  requestId: '654321',
  startTime:'2022-10-17-12:34:00',
  nowTime:'2022-10-17-12:35:00',
};