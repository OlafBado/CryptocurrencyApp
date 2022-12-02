import {
    cryptocurrenciesSlice,
    setSortBy,
    initialState,
    setDirection,
    setInput,
    getMore,
    fetchCryptocurrencies,
} from "../coinsSlice";
import { describe, expect, jest, test } from "@jest/globals";

describe("coins reducers", () => {
    test("should return the initial state when passed an empty action", () => {
        const mockedInitialState = undefined;
        const action = { type: "" };
        const state = cryptocurrenciesSlice.reducer(mockedInitialState, action);
        expect(state).toEqual(initialState);
    });
    test("setSortBy should change the state with received value", () => {
        const action = setSortBy("price");
        const state = cryptocurrenciesSlice.reducer(initialState, action);
        expect(state.sortBy).toEqual("price");
    });
    test("setDirection should change the state with received value", () => {
        const action = setDirection("asc");
        const state = cryptocurrenciesSlice.reducer(initialState, action);
        expect(state.direction).toEqual("asc");
    });
    test("setInput should change the state with received value", () => {
        let action = setInput("bitcoin");
        let state = cryptocurrenciesSlice.reducer(initialState, action);
        expect(state.input).toEqual("bitcoin");
        action = setInput("eth");
        state = cryptocurrenciesSlice.reducer(state, action);
        expect(state.input).toEqual("eth");
        action = setInput("e");
        state = cryptocurrenciesSlice.reducer(state, action);
        expect(state.input).toEqual("e");
    });
    test("getMore should increment the state", () => {
        let action = getMore();
        let state = cryptocurrenciesSlice.reducer(initialState, action);
        expect(state.offset).toEqual(10);
        state = cryptocurrenciesSlice.reducer(state, action);
        state = cryptocurrenciesSlice.reducer(state, action);
        state = cryptocurrenciesSlice.reducer(state, action);
        expect(state.offset).toEqual(40);
    });
});

describe("coins thunk", () => {
    describe("fetch cryptocurrencies with mocked dispatch", () => {
        test("should call an api and return two calls pending and fulfilled type", async () => {
            const dispatch = jest.fn();
            const state = initialState;
            const thunk = fetchCryptocurrencies();
            await thunk(dispatch, () => state, undefined);
            const { calls } = dispatch.mock as any;
            expect(calls).toHaveLength(2);
            expect(calls[0][0].type).toEqual("fetchCryptocurrencies/pending");
            expect(calls[1][0].type).toEqual("fetchCryptocurrencies/fulfilled");
        });
        test("should call an api an return pending and rejected with undefined state", async () => {
            const dispatch = jest.fn();
            const state = undefined;
            const thunk = fetchCryptocurrencies();
            await thunk(dispatch, () => state, undefined);
            const { calls } = dispatch.mock as any;
            expect(calls).toHaveLength(2);
            expect(calls[0][0].type).toEqual("fetchCryptocurrencies/pending");
            expect(calls[1][0].type).toEqual("fetchCryptocurrencies/rejected");
            expect(calls[1][0].payload).toEqual(undefined);
            expect(calls[1][0].error.message).toEqual(
                "Cannot read properties of undefined (reading 'cryptocurrencies')"
            );
        });
    });
});
