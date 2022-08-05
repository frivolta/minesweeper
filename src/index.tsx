import React from "react";
import { render } from "react-dom";
import { Top } from "./components/Top";
import { Scoreboard } from "./components/Scoreboard";

const rootElement = document.getElementById("root");

render(
  <>
    <Top feature="Flag" firstAction="ctrl" secondAction="click">
      Minesweeper
    </Top>
    <Scoreboard
      time="000"
      levels={["beginner", "intermediate", "expert"]}
      defaultLevel="intermediate"
      bombs="010"
      onReset={() => null}
      onChangeLevel={() => null}
    />
  </>,
  rootElement
);
