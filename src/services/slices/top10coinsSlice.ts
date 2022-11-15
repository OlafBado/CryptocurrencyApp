import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SingleCoinData } from "../../components/App/types";
import axios from "axios";
import { AxiosError } from "axios";

const coinsOptions = {
    headers: {
        "X-RapidAPI-Key": "2081c14c4dmshd151c93e0f27c2cp140d7bjsn9c3017090a59",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
};

export const fetchTop10Coins = createAsyncThunk(
    "top10coinsSlice/top10coins",
    async () => {
        try {
            const response = await axios.get(
                "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=10&offset=0",
                coinsOptions
            );
            return response.data.data.coins;
        } catch (err) {
            const error = err as AxiosError;
            return error.message;
        }
    }
);

interface InitialState {
    top10coins: SingleCoinData[];
    top10status: string;
    error: string;
}

const initialState: InitialState = {
    top10coins: [],
    top10status: "",
    error: "",
};

export const top10coinsSlice = createSlice({
    name: "top10coins",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchTop10Coins.pending, (state) => {
                state.top10status = "loading";
            })
            .addCase(fetchTop10Coins.fulfilled, (state, action) => {
                state.top10status = "succeeded";
                state.top10coins = action.payload;
            })
            .addCase(fetchTop10Coins.rejected, (state, action) => {
                state.error = action.error.message!;
            });
    },
});
