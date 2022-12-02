import { describe, expect, jest, test } from "@jest/globals";
import { fetchCoinDetails, initialState } from "../coinDetailsSlice";

describe("coin details thunk", () => {
    describe("fetch coin details with mocked dispatch", () => {
        test("thunk calls an api twice and returns pending and fulfilled type", async () => {
            const dispatch = jest.fn();
            const state = initialState;
            const thunk = fetchCoinDetails("abc");
            await thunk(dispatch, () => state, undefined);
            const { calls } = dispatch.mock as any;
            expect(calls).toHaveLength(2);
            expect(calls[0][0].type).toEqual(
                "coinDetailsSlice/coinDetails/pending"
            );
            expect(calls[1][0].type).toEqual(
                "coinDetailsSlice/coinDetails/fulfilled"
            );
        });
    });
});
