import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SingleCoinDetailsData, ChartData } from "../../components/App/types";
import axios from "axios";

const coinDetailsHistoryOptions = {
    headers: {
        "X-RapidAPI-Key": "2081c14c4dmshd151c93e0f27c2cp140d7bjsn9c3017090a59",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
};

const fetchCoinDetails = createAsyncThunk(
    "coinDetailsSlice/coinDetails",
    async (coin) => {
        // const response = axios.get();
    }
);

type EmptyObject = Record<any, never>;

interface InitialState {
    timePeriod: string;
    coinDetails: SingleCoinDetailsData | EmptyObject;
    coinHistory: ChartData | EmptyObject;
}

const initialState: InitialState = {
    timePeriod: "",
    coinDetails: {},
    coinHistory: {},
};

const coinDetailsSlice = createSlice({
    name: "coinDetails",
    initialState,
    reducers: {},
    extraReducers(builder) {
        // builder.addCase();
    },
});
