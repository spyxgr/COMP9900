import { ComponentStory, ComponentMeta } from "@storybook/react";
import ManagerAddDishButton from "./ManagerAddDishButton";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ManagerAddDishButton",
  component: ManagerAddDishButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ManagerAddDishButton>;

const Template: ComponentStory<typeof ManagerAddDishButton> = (args) => (
  <ManagerAddDishButton {...args} />
);

export const Test = Template.bind({});

Test.args = {

};