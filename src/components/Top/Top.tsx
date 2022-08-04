import styled from "@emotion/styled";
import React, { FC } from "react";
import { GameName, GameNameProps } from "./GameName";
import { Legend, LegendProps } from "./Legend";

export type TopComponentType = LegendProps & GameNameProps;

export const Top: FC<TopComponentType> = ({ children, ...legendProps }) => (
  <Header>
    <GameName>{children}</GameName>
    <Legend {...legendProps} />
  </Header>
);

const Header = styled.header`
  text-align: center;
  position: relative;
  display: inline-block;
`;
