import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { status } from "aws-sdk/clients/iotfleetwise";
import { RootState } from "../../app/store";
import { SingleCoinData } from "../../components/App/types";
import { FETCH_STATE } from "../constants";
import { API } from "aws-amplify";

export const fetchCryptocurrencies = createAsyncThunk(
    "fetchCryptocurrencies",
    async (_, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const { direction, sortBy, offset, input } = state.cryptocurrencies;
        const params = {
            queryStringParameters: {
                sortBy,
                direction,
                offset,
                input,
            },
        };
        try {
            const response = await API.get("cryptoApi", "/coins", params);
            return response.body.data;
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
            state.offset = 0;
            state.sortBy = action.payload;
        },
        setDirection: (state, action) => {
            state.offset = 0;
            state.direction = action.payload;
        },
        setInput: (state, action) => {
            state.offset = 0;
            state.input = action.payload;
        },
        getMore: (state) => {
            state.offset += 10;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCryptocurrencies.pending, (state) => {
                state.coinsStatus = FETCH_STATE.loading;
            })
            .addCase(fetchCryptocurrencies.fulfilled, (state, action) => {
                state.coinsStatus = FETCH_STATE.fulfilled;
                !state.offset
                    ? (state.coins = action.payload.coins)
                    : (state.coins = [...state.coins, ...action.payload.coins]);
                state.total = action.payload.stats.total;
            })
            .addCase(fetchCryptocurrencies.rejected, (state, action) => {
                state.coinsStatus = FETCH_STATE.failed;
                state.error = action.error.message!;
            });
    },
});

export const { setSortBy, setDirection, setInput, getMore } =
    cryptocurrenciesSlice.actions;
