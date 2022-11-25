import { configureStore } from "@reduxjs/toolkit";
import { cryptocurrencyNewsSlice } from "../services/slices/cryptocurrencyNewsSlice";
import { coinNewsSlice } from "../services/slices/coinNewsSlice";
import { globalStatsSlice } from "../services/slices/globalStats";
import { top10coinsSlice } from "../services/slices/top10coinsSlice";
import { cryptocurrenciesSlice } from "../services/slices/coinsSlice";
import { coinDetailsSlice } from "../services/slices/coinDetailsSlice";
import { coinHistorySlice } from "../services/slices/coinHistorySlice";

export const store = configureStore({
    reducer: {
        cryptoNews: cryptocurrencyNewsSlice.reducer,
        coinNews: coinNewsSlice.reducer,
        globalStats: globalStatsSlice.reducer,
        top10coins: top10coinsSlice.reducer,
        cryptocurrencies: cryptocurrenciesSlice.reducer,
        coinDetails: coinDetailsSlice.reducer,
        coinHistory: coinHistorySlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
