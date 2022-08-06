import { Coords, Field, CellState, Cell } from "./Field";
import { checkItemInField, getNeigboursItems } from "./CellsManipulation";

const { empty: e, hidden: h, bomb: b, flag: f } = CellState;

export const openCell = (
  coords: Coords,
  playerField: Field,
  gameField: Field
): Field => {
  const [y, x] = coords;
  const gameCell = gameField[y][x];
  if (gameCell === b) {
    throw new Error("GameWithHooks Over");
  }

  if (gameCell === e) {
    playerField[y][x] = gameCell;
    const items = getNeigboursItems(coords);

    for (const coords of Object.values(items)) {
      if (checkItemInField(coords, gameField)) {
        const [y, x] = coords;
        const gameCell = gameField[y][x];
        const playerCell = playerField[y][x];
        if (gameCell === e && playerCell === h) {
          playerField = openCell(coords, playerField, gameField);
        }
        if (gameCell < b) {
          playerField[y][x] = gameCell;
        }
      }
    }
  }

  playerField[y][x] = gameCell;

  return playerField;
};
