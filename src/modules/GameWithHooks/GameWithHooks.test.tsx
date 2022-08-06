import { GameWithHooks } from "./GameWithHooks";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { CellState } from "../../helpers/Field";
const { empty: e, hidden: h, bomb: b, flag: f } = CellState;

jest.mock("@/helpers/Field");

describe("GameWithHooks test cases", () => {
  describe("Render behaviour", () => {
    it("Render game field by default", () => {
      const { asFragment } = render(<GameWithHooks />);
      expect(screen.getAllByRole("cell")).toHaveLength(81);
      expect(asFragment()).toMatchSnapshot();
    });
    it("onChange game level handler", async () => {
      render(<GameWithHooks />);
      expect(screen.getAllByRole("cell")).toHaveLength(81);
      await userEvent.selectOptions(
        screen.getByRole("combobox"),
        "intermediate"
      );
      expect(screen.getAllByRole("cell")).toHaveLength(256);
      await userEvent.selectOptions(screen.getByRole("combobox"), "expert");
      expect(screen.getAllByRole("cell")).toHaveLength(484);
    });
  });
  describe("Open cell test cases", () => {
    it("Open empty cell on the beginner level", async () => {
      render(<GameWithHooks />);

      expect(screen.queryAllByRole("cell", { name: String(e) })).toHaveLength(
        0
      );

      await userEvent.click(screen.getByTestId("0,0"));

      expect(screen.getAllByRole("cell", { name: String(e) })).toHaveLength(18);
    });
    it("Click to the non-empty cells area", async () => {
      render(<GameWithHooks />);

      await userEvent.click(screen.getByTestId("0,8"));

      expect(screen.getAllByRole("cell", { name: String(1) })).toHaveLength(1);
    });
    it("Check click to the cell when the level is changed", async () => {
      render(<GameWithHooks />);
      expect(screen.getAllByRole("cell")).toHaveLength(81);

      await userEvent.selectOptions(
        screen.getByRole("combobox"),
        "intermediate"
      );
      expect(screen.getAllByRole("cell")).toHaveLength(256);

      await userEvent.click(screen.getByTestId("15,15"));
      expect(screen.getAllByRole("cell", { name: String(e) })).toHaveLength(2);

      await userEvent.selectOptions(screen.getByRole("combobox"), "expert");
      expect(screen.getAllByRole("cell")).toHaveLength(484);

      await userEvent.click(screen.getByTestId("21,21"));
      expect(screen.getAllByRole("cell", { name: String(e) })).toHaveLength(1);
      expect(screen.getAllByRole("cell", { name: String(1) })).toHaveLength(2);
      expect(screen.getAllByRole("cell", { name: String(2) })).toHaveLength(1);
    });
    it("onReset game handler", async () => {
      render(<GameWithHooks />);
      expect(screen.getAllByRole("cell", { name: String(h) })).toHaveLength(81);

      await userEvent.click(screen.getByTestId("0,8"));
      expect(screen.getAllByRole("cell", { name: String(1) })).toHaveLength(1);

      await userEvent.click(screen.getByTestId("0,0"));
      expect(screen.getAllByRole("cell", { name: String(e) })).toHaveLength(18);

      await userEvent.click(screen.getByRole("button"));
      expect(screen.getAllByRole("cell", { name: String(h) })).toHaveLength(81);
    });
  });
});
