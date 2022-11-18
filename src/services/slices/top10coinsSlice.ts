import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SingleCoinData } from "../../components/App/types";
import { AxiosError } from "axios";
import { API } from "aws-amplify";

export const fetchTop10Coins = createAsyncThunk(
    "top10coinsSlice/top10coins",
    async () => {
        try {
            const response = await API.get("api", "/top10", {});
            return response.body.data.coins;
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
