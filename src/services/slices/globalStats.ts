import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Coin } from "../../components/GlobalStats/types";
import axios from "axios";
import { AxiosError } from "axios";

export const fetchGlobalStats = createAsyncThunk(
    "globalStatsSlice/globalStats",
    async () => {
        const options = {
            method: "GET",
            url: "https://coinranking1.p.rapidapi.com/stats",
            params: { referenceCurrencyUuid: "yhjMzLPhuIDl" },
            headers: {
                "X-RapidAPI-Key":
                    "2081c14c4dmshd151c93e0f27c2cp140d7bjsn9c3017090a59",
                "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
            },
        };
        try {
            const result = await axios.request(options);
            return result.data;
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
                state.globalStats = action.payload.data;
            })
            .addCase(fetchGlobalStats.rejected, (state, action) => {
                state.globalStatsStatus = "failed";
                state.error = action.error.message!;
            });
    },
});
