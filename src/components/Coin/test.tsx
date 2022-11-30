import { describe, expect, test } from "@jest/globals";
import { screen } from "@testing-library/react";
import React from "react";
import Coin from "./component";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../../../test-utils";

describe("coin", () => {
    const coin = {
        coinrankingUrl: "test",
        iconUrl: "test",
        name: "test",
        symbol: "test",
        uuid: "test",
        "24hVolume": "1234",
        btcPrice: "999",
        change: "55.55",
        color: "test",
        listedAt: 1,
        marketCap: "9999",
        price: "9.99",
        rank: 1,
        tier: 1,
    };
    test("render properly", () => {
        renderWithProviders(
            <MemoryRouter>
                <Coin coin={coin} />
            </MemoryRouter>
        );
        const article = screen.getByRole("article");
        const heading = screen.getByRole("heading", { name: /1\. test/i });

        expect(article).toBeTruthy();
        expect(heading).toBeTruthy();
        expect(screen.getByText("$9.99")).toBeTruthy();
    });
});
