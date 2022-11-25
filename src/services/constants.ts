export const FETCH_STATE = {
    loading: "loading",
    fulfilled: "succeeded",
    failed: "failed",
};

export const SORT_BY_OPTIONS = [
    {
        option: "Market cap",
        value: "marketCap",
    },
    {
        option: "Price",
        value: "price",
    },
    {
        option: "24h Volume",
        value: "24hVolume",
    },
    {
        option: "Change",
        value: "change",
    },
    {
        option: "Listed at",
        value: "listedAt",
    },
];

export const DIRECTION_OPTIONS = [
    {
        option: "Descending",
        value: "desc",
    },
    {
        option: "Ascending",
        value: "asc",
    },
];
