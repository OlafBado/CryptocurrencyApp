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
        const result = cryptocurrenciesSlice.reducer(
            mockedInitialState,
            action
        );
        expect(result).toEqual(initialState);
    });
    test("setSortBy should change the state with received value", () => {
        const action = setSortBy("price");
        const result = cryptocurrenciesSlice.reducer(initialState, action);
        expect(result.sortBy).toEqual("price");
    });
    test("setDirection should change the state with received value", () => {
        const action = setDirection("asc");
        const result = cryptocurrenciesSlice.reducer(initialState, action);
        expect(result.direction).toEqual("asc");
    });
    test("setInput should change the state with received value", () => {
        const action = setInput("bitcoin");
        const result = cryptocurrenciesSlice.reducer(initialState, action);
        expect(result.input).toEqual("bitcoin");
    });
    test("getMore should update the state by 10", () => {
        const action = getMore();
        const result = cryptocurrenciesSlice.reducer(initialState, action);
        expect(result.offset).toEqual(10);
    });
});
