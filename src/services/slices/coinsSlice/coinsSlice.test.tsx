import {
    cryptocurrenciesSlice,
    setSortBy,
    initialState,
    setDirection,
    setInput,
    getMore,
} from "../coinsSlice";
import { describe, expect, test } from "@jest/globals";

describe("coin reducers", () => {
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
