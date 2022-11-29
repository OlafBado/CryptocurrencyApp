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
                cryptoNewsStatus: "string",
                error: "string",
                news: [
                    {
                        author: "string",
                        content: "string",
                        description: "string",
                        publishedAt: "string",
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
                coinNewsStatus: "string",
                error: "string",
                news: [
                    {
                        author: "string",
                        content: "string",
                        description: "string",
                        publishedAt: "string",
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
                globalStatsStatus: "string",
                error: "string",
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
                    total24hVolume: "string",
                    totalCoins: 1,
                    totalExchanges: 1,
                    totalMarketCap: "string",
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
                        "24hVolume": "string",
                        btcPrice: "string",
                        change: "string",
                        color: "string",
                        listedAt: 1,
                        marketCap: "string",
                        price: "string",
                        rank: 1,
                        tier: 1,
                    },
                ],
                top10status: "string",
                error: "string",
            },
            cryptocurrencies: {
                coins: [
                    {
                        coinrankingUrl: "string",
                        iconUrl: "string",
                        name: "string",
                        symbol: "string",
                        uuid: "string",
                        "24hVolume": "string",
                        btcPrice: "string",
                        change: "string",
                        color: "string",
                        listedAt: 1,
                        marketCap: "string",
                        price: "string",
                        rank: 1,
                        tier: 1,
                    },
                ],
                input: "",
                sortBy: "marketCap",
                direction: "desc",
                coinsStatus: "",
                error: "",
                offset: 0,
                total: 0,
            },
            coinDetails: {
                coinDetailsStatus: "",
                error: "",
                coinDetails: {},
            },
            coinHistory: {
                coinHistoryStatus: "",
                error: "",
                timePeriod: "5y",
                coinHistory: {},
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
