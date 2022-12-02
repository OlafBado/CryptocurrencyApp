import { describe, test, jest, expect } from "@jest/globals";
import {
    fetchCryptocurrencyNews,
    initialState,
} from "../cryptocurrencyNewsSlice";

describe("cryptocurrency news thunk", () => {
    describe("fetch cryptocurrency news with mocked dispatch", () => {
        test("should call api twice and return pending and fulfilled", async () => {
            const dispatch = jest.fn();
            const state = initialState;
            const thunk = fetchCryptocurrencyNews();
            await thunk(dispatch, () => state, undefined);
            const { calls } = dispatch.mock as any;
            expect(calls).toHaveLength(2);
            expect(calls[0][0].type).toEqual(
                "cryptocurrencyNewsSlice/cryptocurrencyNews/pending"
            );
            expect(calls[1][0].type).toEqual(
                "cryptocurrencyNewsSlice/cryptocurrencyNews/fulfilled"
            );
        });
    });
});
