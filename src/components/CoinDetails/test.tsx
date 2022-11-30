import { describe, expect, test } from "@jest/globals";
import { screen, fireEvent } from "@testing-library/react";
import React from "react";
import CoinDetails from "./component";
import { renderWithProviders } from "../../../test-utils";
import "jest-canvas-mock";
global.ResizeObserver = require("resize-observer-polyfill");

describe("coin details", () => {
    test("render properly", async () => {
        renderWithProviders(<CoinDetails />);
        const spinner = screen.getByTestId("spinner");
        let label = screen.queryByText("Price to USD");
        expect(spinner).toBeTruthy();
        expect(label).toBe(null);
        await screen.findByText("5Y");
        label = screen.getByText("Price to USD");
        const chart = screen.getByTestId("chart");
        expect(label).toBeTruthy();
        expect(chart).toBeTruthy();
    });
    test("check button className change onclick", async () => {
        renderWithProviders(<CoinDetails />);
        await screen.findByText("5Y");
        const button1 = screen.getByText("5Y");
        const button2 = screen.getByText("3Y");
        expect(button1.className).toBe("select__button btn");
        expect(button2.className).toBe("select__button");
        fireEvent.click(button2);
        expect(button1.className).toBe("select__button");
        expect(button2.className).toBe("select__button btn");
        screen.debug();
    });
});
