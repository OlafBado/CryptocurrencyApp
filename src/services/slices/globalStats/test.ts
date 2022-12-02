import { describe, test, jest, expect } from "@jest/globals";
import { fetchGlobalStats, initialState } from "../globalStats";

describe("cryptocurrency news thunk", () => {
    describe("fetch cryptocurrency news with mocked dispatch", () => {
        test("should call api twice and return pending and fulfilled", async () => {
            const dispatch = jest.fn();
            const state = initialState;
            const thunk = fetchGlobalStats();
            await thunk(dispatch, () => state, undefined);
            const { calls } = dispatch.mock as any;
            expect(calls).toHaveLength(2);
            expect(calls[0][0].type).toEqual(
                "globalStatsSlice/globalStats/pending"
            );
            expect(calls[1][0].type).toEqual(
                "globalStatsSlice/globalStats/fulfilled"
            );
        });
    });
});
