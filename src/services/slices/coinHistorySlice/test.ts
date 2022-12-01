import {
    initialState,
    coinHistorySlice,
    setTimePeriod,
} from "../coinHistorySlice";
import { expect, test, describe } from "@jest/globals";

describe("coin history reducer", () => {
    test("should set initial state", () => {
        const mockedInitialState = undefined;
        const action = { type: "" };
        const state = coinHistorySlice.reducer(mockedInitialState, action);
        expect(state).toEqual(initialState);
    });
    test("set time period should update state", () => {
        let action = setTimePeriod("7d");
        let state = coinHistorySlice.reducer(initialState, action);
        expect(state.timePeriod).toEqual("7d");
        action = setTimePeriod("3y");
        state = coinHistorySlice.reducer(state, action);
        expect(state.timePeriod).toEqual("3y");
        action = setTimePeriod("3m");
        state = coinHistorySlice.reducer(state, action);
        expect(state.timePeriod).toEqual("3m");
    });
});
