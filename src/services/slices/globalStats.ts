import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Coin } from "../../components/GlobalStats/types";
import axios from "axios";
import { AxiosError } from "axios";
import { API } from "aws-amplify";

export const fetchGlobalStats = createAsyncThunk(
    "globalStatsSlice/globalStats",
    async () => {
        try {
            const result = await API.get("api", "/globalStats", {});
            return result.body.data;
        } catch (err) {
            const error = err as AxiosError;
            return error.message;
        }
    }
);

interface GlobalStats {
    bestCoins: Coin[];
    btcDominance: number;
    newestCoins: Coin[];
    referenceCurrencyRate: number;
    total24hVolume: string;
    totalCoins: number;
    totalExchanges: number;
    totalMarketCap: string;
    totalMarkets: number;
}

type EmptyObject = Record<any, never>;

interface InitialState {
    globalStatsStatus: string;
    error: string;
    globalStats: GlobalStats | EmptyObject;
}

const initialState: InitialState = {
    globalStatsStatus: "",
    error: "",
    globalStats: {},
};

export const globalStatsSlice = createSlice({
    name: "globalStats",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchGlobalStats.pending, (state) => {
                state.globalStatsStatus = "loading";
            })
            .addCase(fetchGlobalStats.fulfilled, (state, action) => {
                state.globalStatsStatus = "succeeded";
                state.globalStats = action.payload;
            })
            .addCase(fetchGlobalStats.rejected, (state, action) => {
                state.globalStatsStatus = "failed";
                state.error = action.error.message!;
            });
    },
});
