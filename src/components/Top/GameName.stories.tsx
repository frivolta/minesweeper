import { GameName, GameNameProps } from "./GameName";
import { Meta, Story } from "@storybook/react";
import { Legend } from "./Legend";
import React from "react";

export default {
  title: "Top/GameName",
  component: GameName,
} as Meta;

const Template: Story<GameNameProps> = (args) => <GameName {...args} />;

export const MineSweeperGameName = Template.bind({});
MineSweeperGameName.args = {
  children: "Minesweeper",
};
