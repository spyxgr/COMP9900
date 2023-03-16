import { ComponentStory, ComponentMeta } from "@storybook/react";
import RecommendationCard from "./RecommendationCard";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "RecommendationCard",
  component: RecommendationCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof RecommendationCard>;

const Template: ComponentStory<typeof RecommendationCard> = (args) => (
  <RecommendationCard {...args} />
);

export const Test = Template.bind({});

Test.args = {

};