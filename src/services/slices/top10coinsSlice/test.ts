import { describe, test, jest, expect } from "@jest/globals";
import { fetchTop10Coins, initialState } from "../top10coinsSlice";

describe("cryptocurrency news thunk", () => {
    describe("fetch cryptocurrency news with mocked dispatch", () => {
        test("should call api twice and return pending and fulfilled", async () => {
            const dispatch = jest.fn();
            const state = initialState;
            const thunk = fetchTop10Coins();
            await thunk(dispatch, () => state, undefined);
            const { calls } = dispatch.mock as any;
            expect(calls).toHaveLength(2);
            expect(calls[0][0].type).toEqual(
                "top10coinsSlice/top10coins/pending"
            );
            expect(calls[1][0].type).toEqual(
                "top10coinsSlice/top10coins/fulfilled"
            );
        });
    });
});
