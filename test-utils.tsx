import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";

import { setupStore } from "./src/app/store";
import type { AppStore, RootState } from "./src/app/store";
import { Provider } from "react-redux";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
    preloadedState?: PreloadedState<RootState>;
    store?: AppStore;
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {
            cryptoNews: {
                cryptoNewsStatus: "succeeded",
                error: "",
                news: [
                    {
                        author: "string",
                        content: "string",
                        description: "string",
                        publishedAt: "2022-11-22T11:00:00Z",
                        title: "string",
                        url: "string",
                        urlToImage: "string",
                        source: {
                            name: "string",
                            id: "string",
                        },
                    },
                ],
            },
            coinNews: {
                coinNewsStatus: "succeeded",
                error: "",
                news: [
                    {
                        author: "string",
                        content: "string",
                        description: "string",
                        publishedAt: "2022-11-22T11:00:00Z",
                        title: "string",
                        url: "string",
                        urlToImage: "string",
                        source: {
                            name: "string",
                            id: "string",
                        },
                    },
                ],
            },
            globalStats: {
                globalStatsStatus: "succeeded",
                error: "",
                globalStats: {
                    bestCoins: [
                        {
                            coinrankingUrl: "string",
                            iconUrl: "string",
                            name: "string",
                            symbol: "string",
                            uuid: "string",
                        },
                    ],
                    btcDominance: 1,
                    newestCoins: [
                        {
                            coinrankingUrl: "string",
                            iconUrl: "string",
                            name: "string",
                            symbol: "string",
                            uuid: "string",
                        },
                    ],
                    referenceCurrencyRate: 1,
                    total24hVolume: "9999",
                    totalCoins: 1,
                    totalExchanges: 1,
                    totalMarketCap: "9999",
                    totalMarkets: 1,
                },
            },
            top10coins: {
                top10coins: [
                    {
                        coinrankingUrl: "string",
                        iconUrl: "string",
                        name: "string",
                        symbol: "string",
                        uuid: "string",
                        "24hVolume": "9999",
                        btcPrice: "150",
                        change: "99.9",
                        color: "string",
                        listedAt: 1,
                        marketCap: "999",
                        price: "150",
                        rank: 1,
                        tier: 1,
                    },
                ],
                top10status: "succeeded",
                error: "",
            },
            cryptocurrencies: {
                coins: [
                    {
                        coinrankingUrl: "string",
                        iconUrl: "string",
                        name: "string",
                        symbol: "string",
                        uuid: "string",
                        "24hVolume": "1234",
                        btcPrice: "1600",
                        change: "99.9",
                        color: "string",
                        listedAt: 1,
                        marketCap: "9999",
                        price: "150",
                        rank: 1,
                        tier: 1,
                    },
                ],
                input: "",
                sortBy: "marketCap",
                direction: "desc",
                coinsStatus: "succeeded",
                error: "",
                offset: 0,
                total: 0,
            },
            coinDetails: {
                coinDetailsStatus: "succeeded",
                error: "",
                coinDetails: {
                    coinrankingUrl: "string",
                    iconUrl: "string",
                    name: "string",
                    symbol: "string",
                    uuid: "string",
                    "24hVolume": "1234",
                    btcPrice: "1600",
                    change: "99.9",
                    color: "string",
                    listedAt: 1438905600,
                    marketCap: "9999",
                    price: "150",
                    rank: 1,
                    tier: 1,
                    links: [
                        {
                            name: "string",
                            url: "string",
                            type: "string",
                        },
                    ],
                    allTimeHigh: {
                        price: "12345",
                        timestamp: 1636502400,
                    },
                    supply: {
                        circulating: "123",
                        confirmed: true,
                        max: "1234",
                        supplyAt: 1669809122,
                        total: "123",
                    },
                    description: "string",
                },
            },
            coinHistory: {
                coinHistoryStatus: "succeeded",
                error: "",
                timePeriod: "5y",
                coinHistory: [
                    {
                        price: "7.315750682178138",
                        timestamp: 1669766400,
                    },
                    {
                        price: "7.201274017671157",
                        timestamp: 1669680000,
                    },
                ],
            },
        },
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return <Provider store={store}>{children}</Provider>;
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
