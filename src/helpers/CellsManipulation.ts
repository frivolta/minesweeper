import { CellState } from "./Field";
import { incrementNeighbours } from "./CellsManipulation.test";

const { empty, bomb } = CellState;

describe("Check Increment neighbours", () => {
  describe("Simple cases", () => {
    it("should work for fields with only one item", () => {
      expect(incrementNeighbours([0, 0], [[bomb]])).toStrictEqual([[bomb]]);
    });
    it("should work for field 2x2 with one mine", () => {
      expect(
        incrementNeighbours(
          [0, 0],
          [
            [bomb, empty],
            [empty, empty],
          ]
        )
      ).toStrictEqual([
        [bomb, 1],
        [1, 1],
      ]);
    });
  });
});
