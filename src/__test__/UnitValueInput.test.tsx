/// <reference types="@testing-library/jest-dom" />

import { render, fireEvent, screen } from "@testing-library/react";
import UnitValueInput from "../components/UnitValueInput";
import { describe, it, expect, beforeEach } from "vitest";

describe("UnitValueInput Component", () => {
  /**
   * Unit test khi unit là %
   */
  describe("When unit is %", () => {
    beforeEach(() => {
      render(<UnitValueInput />);
      const percentBtn = screen.getByText("%");
      expect(percentBtn).toHaveClass("bg-[#424242]");
    });

    it("render with default unit is %", () => {
      expect(screen.getByText("%")).toHaveClass("bg-[#424242]");
    });

    it("replace comma with dot", () => {
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "12,3" } });
      expect(input).toHaveValue("12.3");
    });

    it("convert 150 to 15 when blur", () => {
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "150" } });
      fireEvent.blur(input);
      expect(input).toHaveValue("15");
    });

    it("keep 15.555 when blur", () => {
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "15.555" } });
      fireEvent.blur(input);
      expect(input).toHaveValue("15.555");
    });

    it("convert from 12.4.5 to 12.4", () => {
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "12.4.5" } });
      fireEvent.blur(input);
      expect(input).toHaveValue("12.4");
    });

    it("convert to valid number from 123a to 123", () => {
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "123a" } });
      fireEvent.blur(input);
      expect(input).toHaveValue("12");
    });

    it("convert to valid number from a123 to 0", () => {
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "a123" } });
      fireEvent.blur(input);
      expect(input).toHaveValue("0");
    });
    it("convert to valid number from 12a3 to 12", () => {
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "12a3" } });
      fireEvent.blur(input);
      expect(input).toHaveValue("12");
    });

    it("convert to 0 when value < 0", () => {
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "-5" } });
      fireEvent.blur(input);
      expect(input).toHaveValue("0");
    });

    it("minus and plus button", () => {
      const input = screen.getByRole("textbox");
      const plusBtn = screen.getAllByRole("button")[1];
      fireEvent.click(plusBtn);
      expect(input).toHaveValue("2");
      const minusBtn = screen.getAllByRole("button")[0];
      fireEvent.click(minusBtn);
      expect(input).toHaveValue("1");
    });

    it("disable plus button when value >= 100", () => {
      const input = screen.getByRole("textbox");
      const minusBtn = screen.getByRole("button", { name: /btn-minus/i });
      fireEvent.change(input, { target: { value: "0" } });
      fireEvent.blur(input);
      expect(minusBtn).toBeDisabled();
    });
    
    it("disable plus button when value > 100", () => {
      const input = screen.getByRole("textbox");
      const plusBtn = screen.getByRole("button", { name: /btn-plus/i });
      fireEvent.change(input, { target: { value: "100" } });
      fireEvent.blur(input);
      expect(plusBtn).toBeDisabled();
    });
  });

  /**
   * Unit test khi unit là px
   */
  describe("When unit is px", () => {
    beforeEach(() => {
      render(<UnitValueInput />);
      const pxBtn = screen.getByText("px");
      fireEvent.click(pxBtn);
      expect(pxBtn).toHaveClass("bg-[#424242]"); // Xác nhận px đang active
    });

    it("switches to px and keeps value unchanged", () => {
      expect(screen.getByText("px")).toHaveClass("bg-[#424242]");
    });

    it("allow any number", () => {
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "150" } });
      fireEvent.blur(input);
      expect(input).toHaveValue("150");
    });

    it("convert to 0 when value < 0", () => {
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "-5" } });
      fireEvent.blur(input);
      expect(input).toHaveValue("0");
    });

    it("replace comma with dot", () => {
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "100,25" } });
      expect(input).toHaveValue("100.25");
    });

    it("convert to valid number from 123a to 123", () => {
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "123a" } });
      fireEvent.blur(input);
      expect(input).toHaveValue("123");
    });

    it("convert to valid number from 12a3 to 12", () => {
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "12a3" } });
      fireEvent.blur(input);
      expect(input).toHaveValue("12");
    });

    it("no max limit", () => {
      const input = screen.getByRole("textbox");
      const plusBtn = screen.getAllByRole("button")[1];
      fireEvent.change(input, { target: { value: "150" } });
      fireEvent.click(plusBtn);
      expect(input).toHaveValue("151");
    });

    it("disables minus button when value = 0", () => {
      const input = screen.getByRole("textbox");
      const minusBtn = screen.getByRole("button", { name: /btn-minus/i });
      fireEvent.change(input, { target: { value: "0" } });
      fireEvent.blur(input);
      expect(minusBtn).toBeDisabled();
    });
  });
});
