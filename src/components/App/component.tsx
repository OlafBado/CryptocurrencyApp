import React, { useCallback, useEffect, useReducer, useState } from "react";
import "./style.css";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchCryptocurrencyNews } from "../../services/slices/cryptocurrencyNewsSlice";
import { fetchGlobalStats } from "../../services/slices/globalStats";
import { fetchTop10Coins } from "../../services/slices/top10coinsSlice";
import axios from "axios";
import {
    CoinsReducerState,
    CoinsAction,
    CoinDetailsReducerState,
    CoinDetailsActions,
} from "./types";
import { Route, Routes } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import getNewCoinsUrl from "../../services/CreateUrl/CoinsUrl";
import getCoinDetailsHistoryUrl from "../../services/CreateUrl/CoinDetailsHistoryUrl/service";
import getCoinDetailsUrl from "../../services/CreateUrl/CoinDetailsUrl/service";
import getSubstring from "../../services/FormatString/GetSubstring/service";
import Navbar from "../Navbar";
import Hero from "../Hero";
import GlobalStats from "../GlobalStats";
import Footer from "../Footer";
import Top10Coins from "../Top10Coins";
import Cryptocurrencies from "../Cryptocurrencies";
import Spinner from "../Spinner";
import CoinDetails from "../CoinDetails";
import Marquee from "react-fast-marquee";
import NewsItem from "../NewsItem";
import { API } from "aws-amplify";

const coinDetailsHistoryOptions = {
    headers: {
        "X-RapidAPI-Key": "2081c14c4dmshd151c93e0f27c2cp140d7bjsn9c3017090a59",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
};

const coinDetailsOptions = {
    headers: {
        "X-RapidAPI-Key": "2081c14c4dmshd151c93e0f27c2cp140d7bjsn9c3017090a59",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
};

const coinsOptions = {
    headers: {
        "X-RapidAPI-Key": "2081c14c4dmshd151c93e0f27c2cp140d7bjsn9c3017090a59",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
};

const newsOptions = {
    headers: {
        "X-Api-Key": "6c4cecd8f42848339d8f5ec708760227",
    },
};

// reducer function to handle coins data

const coinsReducer = (state: CoinsReducerState, action: CoinsAction) => {
    switch (action.type) {
        case "COINS_FETCH_INIT":
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case "COINS_FETCH_SUCCESS":
            return {
                ...state,
                isLoading: false,
                isError: false,
                data:
                    state.offset === 0
                        ? action.payload.data
                        : state.data.concat(action.payload.data),
                total: action.payload.total,
            };
        case "COINS_FETCH_FAILURE":
            return {
                ...state,
                isError: true,
            };
        case "COINS_FETCH_MORE":
            return {
                ...state,
                offset: state.offset + 10,
            };
        case "COINS_RESET_OFFSET":
            return {
                ...state,
                offset: 0,
            };
        case "COINS_CHANGE_SORT_BY":
            return {
                ...state,
                sortBy: action.payload.sortBy,
            };
        case "COINS_CHANGE_DIRECTION":
            return {
                ...state,
                direction: action.payload.direction,
            };
        case "COINS_DEFAULT_STATE":
            return {
                ...state,
                offset: 0,
                sortBy: "marketCap",
                direction: "desc",
            };
        default:
            throw new Error();
    }
};

const coinDetailsReducer = (
    state: CoinDetailsReducerState,
    action: CoinDetailsActions
) => {
    switch (action.type) {
        case "COIN_DETAILS_FETCH_INIT":
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case "COIN_DETAILS_FETCH_FAILURE":
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        case "COIN_DETAILS_FETCH_SUCCESS":
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.data,
                chartData: {
                    ...state.chartData,
                    change: action.payload.change,
                    history: action.payload.priceHistory,
                },
            };
        case "COIN_DETAILS_CHANGE_TIME_PERIOD":
            return {
                ...state,
                chartData: {
                    ...state.chartData,
                    timePeriod: action.payload,
                },
            };
        case "COIN_DETAILS_UPDATE_HISTORY":
            return {
                ...state,
                chartData: {
                    ...state.chartData,
                    change: action.payload.change,
                    history: action.payload.priceHistory,
                },
            };
    }
};

const App = () => {
    const dispatch = useAppDispatch();
    const { news } = useAppSelector((state) => state.cryptoNews);
    const { top10coins } = useAppSelector((state) => state.top10coins);

    const { globalStatsStatus } = useAppSelector((state) => state.globalStats);
    const { cryptoNewsStatus } = useAppSelector((state) => state.cryptoNews);
    const { coinNewsStatus } = useAppSelector((state) => state.coinNews);

    const [inputResult, setInputResult] = useState<string>("");

    const [coinDetails, dispatchCoinDetails] = useReducer(coinDetailsReducer, {
        data: {},
        chartData: { change: "0", history: [], timePeriod: "3y" },
        isLoading: false,
        isError: false,
    });
    const [coinDetailsUrl, setCoinDetailsUrl] = useState<string>("");
    const [coinDetailsHistoryUrl, setCoinDetailsHistoryUrl] =
        useState<string>("");

    const [coins, dispatchCoins] = useReducer(coinsReducer, {
        data: [],
        sortBy: "marketCap",
        direction: "desc",
        offset: 0,
        total: 0,
        isLoading: false,
        isError: false,
    });
    const [coinsUrl, setCoinsUrl] = useState<string[]>([
        getNewCoinsUrl("marketCap", "desc", 10, coins.offset, ""),
    ]);

    const debouncedValue = useDebounce(coinsUrl[0], 300);

    const getJson = async () => {
        try {
            // const result = await API.get('cryptoApi', '/example')
            const result = await axios.get(
                "https://nwbgellxcb.execute-api.us-east-1.amazonaws.com/dev/example2"
            );
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        // dispatch(fetchCryptocurrencyNews())
        dispatch(fetchGlobalStats());
        dispatch(fetchTop10Coins());
        // getJson()
    }, []);

    const handleFetchCoinDetails = useCallback(async () => {
        try {
            const coinDetails = await axios.get(
                coinDetailsUrl,
                coinDetailsOptions
            );
            const priceHistory = await axios.get(
                coinDetailsHistoryUrl,
                coinDetailsHistoryOptions
            );
            dispatchCoinDetails({
                type: "COIN_DETAILS_FETCH_SUCCESS",
                payload: {
                    data: coinDetails.data.data.coin,
                    change: priceHistory.data.data.change,
                    priceHistory: priceHistory.data.data.history,
                },
            });
        } catch {
            dispatchCoinDetails({
                type: "COIN_DETAILS_FETCH_FAILURE",
            });
        }
    }, [coinDetailsUrl]);

    const handleFetchCoinDetailsHistory = useCallback(async () => {
        try {
            const response = await axios.get(
                coinDetailsHistoryUrl,
                coinDetailsHistoryOptions
            );

            dispatchCoinDetails({
                type: "COIN_DETAILS_UPDATE_HISTORY",
                payload: {
                    change: response.data.data.change,
                    priceHistory: response.data.data.history,
                },
            });
        } catch {
            dispatchCoinDetails({
                type: "COIN_DETAILS_FETCH_FAILURE",
            });
        }
    }, [coinDetailsHistoryUrl]);

    useEffect(() => {
        handleFetchCoinDetailsHistory();
    }, [handleFetchCoinDetailsHistory]);

    useEffect(() => {
        dispatchCoinDetails({
            type: "COIN_DETAILS_FETCH_INIT",
        });
        handleFetchCoinDetails();
    }, [handleFetchCoinDetails]);

    const handleFetchCoins = useCallback(async () => {
        try {
            const result = await axios.get(coinsUrl[0], coinsOptions);
            dispatchCoins({
                type: "COINS_FETCH_SUCCESS",
                payload: {
                    data: result.data.data.coins,
                    total: result.data.data.stats.total,
                },
            });
        } catch {
            dispatchCoins({
                type: "COINS_FETCH_FAILURE",
            });
        }
    }, [debouncedValue]);

    useEffect(() => {
        dispatchCoins({
            type: "COINS_FETCH_INIT",
        });
        handleFetchCoins();
    }, [handleFetchCoins]);

    const handleSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputResult(e.target.value);
            dispatchCoins({
                type: "COINS_RESET_OFFSET",
            });
            setCoinsUrl([
                getNewCoinsUrl("marketCap", "desc", 10, 0, e.target.value),
            ]);
        },
        [inputResult]
    );

    const handleFetchMore = () => {
        const offset = parseInt(getSubstring(coinsUrl[0], "offset=", "&"));
        setCoinsUrl([
            getNewCoinsUrl(
                coins.sortBy,
                coins.direction,
                10,
                offset + 10,
                inputResult
            ),
        ]);
        dispatchCoins({
            type: "COINS_FETCH_MORE",
        });
    };

    const handleDefaultCoinsState = () => {
        dispatchCoins({
            type: "COINS_DEFAULT_STATE",
        });
        setInputResult("");
        setCoinsUrl([getNewCoinsUrl("marketCap", "desc", 10, 0, "")]);
    };

    const handleGetCoinDetails = (id: string, name: string) => {
        setCoinDetailsUrl(getCoinDetailsUrl(id));
        setCoinDetailsHistoryUrl(
            getCoinDetailsHistoryUrl(id, coinDetails.chartData.timePeriod)
        );
    };

    const handleGetCoinHistory = (id: string, period: string) => {
        dispatchCoinDetails({
            type: "COIN_DETAILS_CHANGE_TIME_PERIOD",
            payload: period,
        });
        setCoinDetailsHistoryUrl(getCoinDetailsHistoryUrl(id, period));
    };

    const handleSortBy = (value: string) => {
        switch (value) {
            case "desc":
            case "asc":
                dispatchCoins({
                    type: "COINS_CHANGE_DIRECTION",
                    payload: {
                        direction: value,
                    },
                });
                dispatchCoins({
                    type: "COINS_RESET_OFFSET",
                });
                setCoinsUrl([
                    getNewCoinsUrl(
                        coins.sortBy,
                        value,
                        10,
                        coins.offset,
                        inputResult
                    ),
                ]);
                break;
            default:
                dispatchCoins({
                    type: "COINS_CHANGE_SORT_BY",
                    payload: {
                        sortBy: value,
                    },
                });
                dispatchCoins({
                    type: "COINS_RESET_OFFSET",
                });
                setCoinsUrl([
                    getNewCoinsUrl(
                        value,
                        coins.direction,
                        10,
                        coins.offset,
                        inputResult
                    ),
                ]);
                break;
        }
    };
    return (
        <>
            <Navbar handleDefaultCoinsState={handleDefaultCoinsState} />
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Hero />
                            {globalStatsStatus === "loading" ||
                            coinNewsStatus === "loading" ||
                            cryptoNewsStatus === "loading" ? (
                                <Spinner />
                            ) : globalStatsStatus === "failed" ||
                              coinNewsStatus === "failed" ||
                              cryptoNewsStatus === "failed" ? (
                                <div>Something went wrong...</div>
                            ) : (
                                <>
                                    <GlobalStats />
                                    <Top10Coins coins={top10coins} />
                                    <Marquee
                                        style={{
                                            height: "auto",
                                            display: "grid",
                                            overflow: "hidden",
                                            alignItems: "none",
                                            margin: "0.25rem 0",
                                        }}
                                        speed={5}
                                        pauseOnHover={true}
                                        loop={0}
                                        className="marquee-main-news"
                                        gradientWidth={50}
                                    >
                                        {news?.map((n) => (
                                            <NewsItem key={n.url} news={n} />
                                        ))}
                                    </Marquee>
                                </>
                            )}
                        </>
                    }
                />
                <Route
                    path="/cryptocurrencies"
                    element={
                        <Cryptocurrencies
                            coins={coins.data}
                            handleSearch={handleSearch}
                            inputResult={inputResult}
                            isLoading={coins.isLoading}
                            handleFetchMore={handleFetchMore}
                            total={coins.total}
                            coinUrl={coinsUrl}
                            sortBy={coins.sortBy}
                            direction={coins.direction}
                            handleSortBy={handleSortBy}
                        />
                    }
                />
                <Route
                    path="/cryptocurrencies/:id"
                    element={
                        coinDetails.isLoading ? (
                            <Spinner />
                        ) : (
                            <CoinDetails
                                coinHistory={coinDetails.chartData}
                                coinDetails={coinDetails.data}
                                handleGetCoinDetails={handleGetCoinDetails}
                                handleGetCoinHistory={handleGetCoinHistory}
                                timePeriod={coinDetails.chartData.timePeriod}
                            />
                        )
                    }
                />
            </Routes>
            <Footer />
        </>
    );
};

export default App;
