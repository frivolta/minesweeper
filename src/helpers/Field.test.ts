import { emptyFieldGenerator, CellState, fieldGenerator } from "./Field";
const { empty, bomb, hidden } = CellState;

describe("Field generator", () => {
  describe("emptyFieldGenerator tests", () => {
    it("should 2x2", function () {
      expect(emptyFieldGenerator(2)).toStrictEqual([
        [empty, empty],
        [empty, empty],
      ]);
    });
    it("should 3x3 with hidden state", function () {
      expect(emptyFieldGenerator(3, hidden)).toStrictEqual([
        [hidden, hidden, hidden],
        [hidden, hidden, hidden],
        [hidden, hidden, hidden],
      ]);
    });
  });
  describe("Simple cases", () => {
    it("should return error on wrong dencity", function () {
      const errorText = "Probability must be between 0 and 1";
      expect(() => fieldGenerator(1, -1)).toThrow(errorText);
      expect(() => fieldGenerator(1, 2)).toThrow(errorText);
    });
    it("should return a field without a mine", function () {
      expect(fieldGenerator(1, 0)).toStrictEqual([[empty]]);
    });
    it("should return a field with a mine", function () {
      expect(fieldGenerator(1, 1)).toStrictEqual([[bomb]]);
    });
    it("should return a field 2x2 with all mines", function () {
      expect(fieldGenerator(2, 1)).toStrictEqual([
        [bomb, bomb],
        [bomb, bomb],
      ]);
    });
    it("should return a field 2x2 with 50% probability", function () {
      const field = fieldGenerator(2, 0.5);
      const flatField = field.flat();
      const cellsWithBomb = flatField.filter((cell) => cell === bomb);
      const emptyCells = flatField.filter((cell) => cell === empty);

      expect(cellsWithBomb).toHaveLength(2);
      expect(emptyCells).toHaveLength(2);
    });
  });
});
