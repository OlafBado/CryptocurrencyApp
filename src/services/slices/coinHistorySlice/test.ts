import {
    initialState,
    coinHistorySlice,
    setTimePeriod,
    fetchCoinHistory,
} from "../coinHistorySlice";
import { expect, test, describe, jest } from "@jest/globals";

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

describe("coin history thunk", () => {
    describe("fetch coin history data with mocked dispatch", () => {
        test("thunk calls an api twice and returns pending and fulfilled type", async () => {
            const dispatch = jest.fn();
            const state = initialState;
            const thunk = fetchCoinHistory("abc");
            await thunk(dispatch, () => state, undefined);
            const { calls } = dispatch.mock as any;
            expect(calls).toHaveLength(2);
            expect(calls[0][0].type).toEqual(
                "coinHistorySlice/coinHistory/pending"
            );
            expect(calls[1][0].type).toEqual(
                "coinHistorySlice/coinHistory/fulfilled"
            );
        });
        test("thunk calls api and returns pending and rejected with undefined state", async () => {
            const dispatch = jest.fn();
            const state = undefined;
            const thunk = fetchCoinHistory("abc");
            await thunk(dispatch, () => state, undefined);
            const { calls } = dispatch.mock as any;
            expect(calls).toHaveLength(2);
            expect(calls[0][0].type).toEqual(
                "coinHistorySlice/coinHistory/pending"
            );
            expect(calls[1][0].type).toEqual(
                "coinHistorySlice/coinHistory/rejected"
            );
            expect(calls[1][0].payload).toEqual(undefined);
            expect(calls[1][0].error.message).toEqual(
                "Cannot read properties of undefined (reading 'coinHistory')"
            );
        });
    });
});
