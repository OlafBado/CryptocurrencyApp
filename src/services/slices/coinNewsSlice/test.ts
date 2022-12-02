import { describe, test, jest, expect } from "@jest/globals";
import { fetchCoinNews, initialState } from "../coinNewsSlice";

describe("coin news thunk", () => {
    describe("fetch coin news with mocked dispatch", () => {
        test("should call api twice and return pending and fulfilled", async () => {
            const dispatch = jest.fn();
            const state = initialState;
            const thunk = fetchCoinNews("abc");
            await thunk(dispatch, () => state, undefined);
            const { calls } = dispatch.mock as any;
            expect(calls).toHaveLength(2);
            expect(calls[0][0].type).toEqual("coinNewsSlice/coinNews/pending");
            expect(calls[1][0].type).toEqual(
                "coinNewsSlice/coinNews/fulfilled"
            );
        });
    });
});
