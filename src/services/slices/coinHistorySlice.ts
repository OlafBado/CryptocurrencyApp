import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PriceHistory } from "../../components/App/types";
import { FETCH_STATE } from "../constants";
import { RootState } from "../../app/store";
import { API } from "aws-amplify";

export const fetchCoinHistory = createAsyncThunk(
    "coinHistorySlice/coinHistory",
    async (id: string, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;
            const { timePeriod } = state.coinHistory;
            const params = {
                queryStringParameters: {
                    id,
                    timePeriod,
                },
            };
            const response = await API.get("cryptoApi", "/coinHistory", params);
            return response.body.data.history;
        } catch (err) {
            return err;
        }
    }
);

type EmptyObject = Record<any, never>;

interface InitialState {
    timePeriod: string;
    coinHistory: PriceHistory[] | EmptyObject;
    coinHistoryStatus: string;
    error: string;
}

const initialState: InitialState = {
    coinHistoryStatus: "",
    error: "",
    timePeriod: "5y",
    coinHistory: {},
};

export const coinHistorySlice = createSlice({
    name: "coinDetails",
    initialState,
    reducers: {
        setTimePeriod: (state, action) => {
            state.timePeriod = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCoinHistory.pending, (state) => {
                state.coinHistoryStatus = FETCH_STATE.loading;
            })
            .addCase(fetchCoinHistory.fulfilled, (state, action) => {
                state.coinHistoryStatus = FETCH_STATE.fulfilled;
                state.coinHistory = action.payload;
            })
            .addCase(fetchCoinHistory.rejected, (state, action) => {
                state.coinHistoryStatus = FETCH_STATE.failed;
                state.error = action.error.message!;
            });
    },
});

export const { setTimePeriod } = coinHistorySlice.actions;
