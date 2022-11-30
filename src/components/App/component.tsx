import React, { useEffect } from "react";
import "./style.css";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchGlobalStats } from "../../services/slices/globalStats";
import { fetchTop10Coins } from "../../services/slices/top10coinsSlice";
import { Route, Routes } from "react-router-dom";
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
import { FETCH_STATE } from "../../services/constants";
import { fetchCryptocurrencyNews } from "../../services/slices/cryptocurrencyNewsSlice";

const App = () => {
    const { dispatch, news, globalStatsStatus, cryptoNewsStatus } = useApp();

    return (
        <>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Hero />
                            {globalStatsStatus === FETCH_STATE.loading ||
                            cryptoNewsStatus === FETCH_STATE.loading ? (
                                <Spinner />
                            ) : globalStatsStatus === FETCH_STATE.failed ||
                              cryptoNewsStatus === FETCH_STATE.failed ? (
                                <div>Something went wrong...</div>
                            ) : (
                                <>
                                    <GlobalStats />
                                    <Top10Coins />
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
                    element={<Cryptocurrencies />}
                />
                <Route path="/cryptocurrencies/:id" element={<CoinDetails />} />
            </Routes>
            <Footer />
        </>
    );
};

const useApp = () => {
    const dispatch = useAppDispatch();
    const { news } = useAppSelector(({ cryptoNews }) => cryptoNews);
    const { globalStatsStatus } = useAppSelector(
        ({ globalStats }) => globalStats
    );
    const { cryptoNewsStatus } = useAppSelector(({ cryptoNews }) => cryptoNews);

    useEffect(() => {
        dispatch(fetchCryptocurrencyNews());
        dispatch(fetchGlobalStats());
        dispatch(fetchTop10Coins());
    }, []);
    return {
        dispatch,
        news,
        globalStatsStatus,
        cryptoNewsStatus,
    };
};

export default App;
