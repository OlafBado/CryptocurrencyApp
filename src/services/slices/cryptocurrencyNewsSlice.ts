import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "aws-amplify";
import { SingleNewsData } from "../../components/App/types";
import { FETCH_STATE } from "../constants";

export const fetchCryptocurrencyNews = createAsyncThunk(
    "cryptocurrencyNewsSlice/cryptocurrencyNews",
    async () => {
        const params = {
            queryStringParameters: {
                coin: "Cryptocurrency",
                pageSize: "100",
            },
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
    cryptoNewsStatus: string;
    error: string;
    news: SingleNewsData[];
}

const initialState: InitialState = {
    cryptoNewsStatus: "",
    error: "",
    news: [],
};

export const cryptocurrencyNewsSlice = createSlice({
    name: "cryptocurrencyNews",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCryptocurrencyNews.pending, (state) => {
                state.cryptoNewsStatus = FETCH_STATE.loading;
            })
            .addCase(fetchCryptocurrencyNews.fulfilled, (state, action) => {
                state.cryptoNewsStatus = FETCH_STATE.fulfilled;
                state.news = action.payload;
            })
            .addCase(fetchCryptocurrencyNews.rejected, (state, action) => {
                state.cryptoNewsStatus = FETCH_STATE.failed;
                state.error = action.error.message!;
            });
    },
});
