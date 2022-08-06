import React, { FC, useState, useMemo, useCallback, useEffect } from "react";

import { Grid } from "@/components/Grid";
import { Top } from "@/components/Top";
import { Scoreboard } from "@/components/Scoreboard";
import { GameArea, Wrapper, GameOver } from "@/components/Game";
import { Field } from "@/helpers/Field";
import { GameLevels, GameSettings, LevelNames } from "./GameSettings";
import {
  CellState,
  Coords,
  fieldGenerator,
  generateFieldWithDefaultState,
} from "../../helpers/Field";
import { openCell } from "../../helpers/OpenCell";

export interface GameProps {}

export const GameWithHooks: FC<GameProps> = () => {
  const [level, setLevel] = useState<LevelNames>("beginner");

  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);

  const [size, bombs] = GameSettings[level];

  const [playerField, setPlayerField] = useState<Field>(
    generateFieldWithDefaultState(size, CellState.hidden)
  );

  const [gameField, setGameField] = useState<Field>(
    fieldGenerator(size, bombs / (size * size))
  );

  const onClick = (coords: Coords) => {
    try {
      const newPlayerField = openCell(coords, playerField, gameField);
      setPlayerField([...newPlayerField]);
    } catch (e) {
      setPlayerField([...gameField]);
      setIsGameOver(true);
    }
  };

  const resetHandler = ([size, bombs]: [number, number]) => {
    const newGameField = fieldGenerator(size, bombs / (size * size));
    const newPlayerField = generateFieldWithDefaultState(
      size,
      CellState.hidden
    );

    setGameField([...newGameField]);
    setPlayerField([...newPlayerField]);
    setIsGameOver(false);
    setIsWin(false);
  };
  const onChangeLevel = ({
    target: { value: level },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(level as LevelNames);
    const newSettings = GameSettings[level as LevelNames];
    resetHandler(newSettings);
  };
  const onReset = () => resetHandler([size, bombs]);

  return (
    <Wrapper>
      <Top feature="Flag" firstAction="right" secondAction="click">
        Minesweeper
      </Top>
      <GameArea>
        <Scoreboard
          time="0"
          bombs="10"
          levels={GameLevels as unknown as string[]}
          defaultLevel={level}
          onReset={onReset}
          onChangeLevel={onChangeLevel}
        />
        <GameOver onClick={() => null} isWin={true} />
        <Grid onClick={onClick} onContextMenu={() => null}>
          {playerField}
        </Grid>
      </GameArea>
    </Wrapper>
  );
};
