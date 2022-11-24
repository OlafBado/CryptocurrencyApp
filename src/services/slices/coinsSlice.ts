import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { status } from "aws-sdk/clients/iotfleetwise";
import axios from "axios";
import { RootState } from "../../app/store";
import getNewCoinsUrl from "../CreateUrl/CoinsUrl/service";
import { SingleCoinData } from "../../components/App/types";

const coinsOptions = {
    headers: {
        "X-RapidAPI-Key": "2081c14c4dmshd151c93e0f27c2cp140d7bjsn9c3017090a59",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
};

export const fetchCryptocurrencies = createAsyncThunk(
    "fetchCryptocurrencies",
    async (_, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const { direction, sortBy, offset, input } = state.cryptocurrencies;
        const url = getNewCoinsUrl(sortBy, direction, 10, offset, input);
        try {
            const response = await axios.get(url, coinsOptions);
            return response.data.data.coins;
        } catch (err) {
            return err;
        }
    }
);

interface InitialState {
    coins: SingleCoinData[];
    input: string;
    sortBy: string;
    direction: string;
    coinsStatus: string;
    error: status;
    offset: 0;
    total: 0;
}

const initialState: InitialState = {
    coins: [],
    input: "",
    sortBy: "marketCap",
    direction: "desc",
    coinsStatus: "",
    error: "",
    offset: 0,
    total: 0,
};

export const cryptocurrenciesSlice = createSlice({
    name: "cryptocurrencies",
    initialState,
    reducers: {
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        setDirection: (state, action) => {
            state.direction = action.payload;
        },
        setInput: (state, action) => {
            state.input += action.payload;
        },
        getMore: (state) => {
            state.offset += 10;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCryptocurrencies.pending, (state) => {
                state.coinsStatus = "loading";
            })
            .addCase(fetchCryptocurrencies.fulfilled, (state, action) => {
                state.coinsStatus = "fulfilled";
                state.coins = action.payload;
                state.total = action.payload.length;
            })
            .addCase(fetchCryptocurrencies.rejected, (state, action) => {
                state.coinsStatus = "failed";
                state.error = action.error.message!;
            });
    },
});

export const { setSortBy, setDirection, setInput, getMore } =
    cryptocurrenciesSlice.actions;
