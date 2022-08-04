import styled from "@emotion/styled";
import React, { FC } from "react";

export interface LegendProps {
  /**
   * Feature that should be activated after first+second actions
   */
  feature: string;
  /**
   * First action
   */
  firstAction: string;
  /**
   * Second Action
   */
  secondAction: string;
}

export const Legend: FC<LegendProps> = ({
  feature,
  firstAction,
  secondAction,
}) => (
  <Parent>
    <strong>{feature}</strong>
    <FlagComboParent>
      <Key>{firstAction}: </Key> + <Click>{secondAction}</Click>
    </FlagComboParent>
  </Parent>
);

const Key = styled.span`
  color: #ec433c;
`;

const Click = styled.span`
  color: #2a48ec;
`;

const Parent = styled.legend`
  font-size: 1em;
  margin: 0 auto 2vw;
  line-height: 1.25em;
`;

const FlagComboParent = styled.code`
  background: #e3e3e3;
`;
