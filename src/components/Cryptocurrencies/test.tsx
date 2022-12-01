import { describe, expect, test } from "@jest/globals";
import { screen } from "@testing-library/react";
import React from "react";
import Cryptocurrencies from "./component";
import { renderWithProviders } from "../../../test-utils";
import "jest-canvas-mock";
import { MemoryRouter } from "react-router-dom";

describe("cryptocurrencies", () => {
    test("render properly", async () => {
        renderWithProviders(
            <MemoryRouter>
                <Cryptocurrencies />
            </MemoryRouter>
        );

        const coins = await screen.findAllByRole("link");
        expect(coins.length).toBe(2);
    });
});
