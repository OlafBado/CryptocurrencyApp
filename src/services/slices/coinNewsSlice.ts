import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "aws-amplify";
import { SingleNewsData } from "../../components/App/types";
import { FETCH_STATE } from "../constants";

export const fetchCoinNews = createAsyncThunk(
    "coinNewsSlice/coinNews",
    async (coin: string) => {
        const params = {
            queryStringParameters: { coin: `Crypto ${coin}`, pageSize: "20" },
        };
        try {
            const result = await API.get("cryptoApi", "/getNews", params);
            return result.body.articles;
        } catch (err) {
            return err;
        }
    }
);

interface InitialState {
    coinNewsStatus: string;
    error: string;
    news: SingleNewsData[];
}

export const initialState: InitialState = {
    coinNewsStatus: "",
    error: "",
    news: [],
};

export const coinNewsSlice = createSlice({
    name: "coinNews",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCoinNews.pending, (state) => {
                state.coinNewsStatus = FETCH_STATE.loading;
            })
            .addCase(fetchCoinNews.fulfilled, (state, action) => {
                state.coinNewsStatus = FETCH_STATE.fulfilled;
                state.news = action.payload;
            })
            .addCase(fetchCoinNews.rejected, (state, action) => {
                state.coinNewsStatus = FETCH_STATE.failed;
                state.error = action.error.message!;
            });
    },
});
