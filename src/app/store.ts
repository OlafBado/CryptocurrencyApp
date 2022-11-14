import { configureStore } from "@reduxjs/toolkit";
import { cryptocurrencyNewsSlice } from "../services/slices/cryptocurrencyNewsSlice";
import { coinNewsSlice } from "../services/slices/coinNewsSlice";

export const store =  configureStore({
    reducer: {
        cryptoNews: cryptocurrencyNewsSlice.reducer,
        coinNews: coinNewsSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch