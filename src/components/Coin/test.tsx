import { describe, expect, test, jest } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Coin from "./component";
import { MemoryRouter } from "react-router-dom";

describe("coin", () => {
    const coin = {
        coinrankingUrl: "test",
        iconUrl: "test",
        name: "test",
        symbol: "test",
        uuid: "test",
        "24hVolume": "test",
        btcPrice: "test",
        change: "test",
        color: "test",
        listedAt: 1,
        marketCap: "test",
        price: "test",
        rank: 1,
        tier: 1,
    };
    test("render", () => {
        render(<Coin coin={coin} />, { wrapper: MemoryRouter });
        const article = screen.getByRole("article");
        const heading = screen.getByRole("heading", { name: /1\. test/i });
        expect(article).toBeTruthy();
        expect(heading).toBeTruthy();
    });
});
