import React, { useEffect } from "react";
import "./style.css";
import { CoinDetailsProps } from "./types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useParams } from "react-router-dom";
import LineChart from "../LineChart";
import millify from "millify";
import HTMLparser from "html-react-parser";
import ChangeButtons from "../ChangeButtons";
import NewsItem from "../NewsItem";
import { fetchCoinNews } from "../../services/slices/coinNewsSlice";

const options = [
    {
        option: "5Y",
        value: "5y",
    },
    {
        option: "3Y",
        value: "3y",
    },
    {
        option: "1Y",
        value: "1y",
    },
    {
        option: "30D",
        value: "30d",
    },
    {
        option: "7D",
        value: "7d",
    },
    {
        option: "24H",
        value: "24h",
    },
    {
        option: "3H",
        value: "3h",
    },
    {
        option: "3M",
        value: "3m",
    },
];

const CoinDetails: React.FC<CoinDetailsProps> = ({
    timePeriod,
    handleGetCoinHistory,
    coinDetails,
    coinHistory,
    handleGetCoinDetails,
}) => {
    const dispatch = useAppDispatch();
    const coinId = useParams();

    const { news } = useAppSelector((state) => state.coinNews);

    useEffect(() => {
        handleGetCoinDetails(coinId.id!, coinDetails.name);
        // dispatch(fetchCoinNews(coinDetails.name))
    }, []);

    const handleChangeHistoryPeriod = (period: string) => {
        handleGetCoinHistory(coinId.id!, period);
    };

    return (
        <>
            <div className="container">
                <h1 className="coin-details__title">
                    {coinDetails.name}
                    <span>({coinDetails.symbol})</span>
                </h1>
                <p className="coin-details__description">
                    {coinDetails.name} live price in US dollars. View historical
                    price, staticstics and supply.
                </p>
                <ChangeButtons
                    handler={handleChangeHistoryPeriod}
                    options={options}
                    state={timePeriod}
                    label="Select time period"
                />
                <LineChart
                    coinHistory={coinHistory.history}
                    currentPrice={millify(coinDetails.price)}
                    coinName={coinDetails.name}
                />
            </div>
            <div className="container">
                <div className="coin-details-upper-section__wrapper">
                    <section className="coin-details__value-stats">
                        <h2 className="coin-details__value-stats__title">
                            {coinDetails.name} value statistics
                        </h2>
                        <p className="coin-details__value-stats__description">
                            An overwiev showing the stats of {coinDetails.name}
                        </p>
                        <div className="row">
                            <h4 className="coin-details__value-stats__sub-title">
                                Price to USD
                            </h4>
                            <p className="coin-details__value-stats__sub-description">
                                {millify(coinDetails.price)}
                            </p>
                        </div>
                        <div className="row">
                            <h4 className="coin-details__value-stats__sub-title">
                                24h Volume
                            </h4>
                            <p className="coin-details__value-stats__sub-description">
                                {millify(parseInt(coinDetails["24hVolume"]))}
                            </p>
                        </div>
                        <div className="row">
                            <h4 className="coin-details__value-stats__sub-title">
                                Market Cap
                            </h4>
                            <p className="coin-details__value-stats__sub-description">
                                {millify(parseInt(coinDetails.marketCap))}
                            </p>
                        </div>
                        <div className="row">
                            <h4 className="coin-details__value-stats__sub-title">
                                Tier
                            </h4>
                            <p className="coin-details__value-stats__sub-description">
                                {coinDetails.tier}
                            </p>
                        </div>
                        <div className="row">
                            <h4 className="coin-details__value-stats__sub-title">
                                Listed At
                            </h4>
                            <p className="coin-details__value-stats__sub-description">
                                {new Date(
                                    coinDetails?.listedAt * 1000
                                ).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="row">
                            <h4 className="coin-details__value-stats__sub-title">
                                All-time-high (price)
                            </h4>
                            <p className="coin-details__value-stats__sub-description">
                                {millify(
                                    parseInt(coinDetails?.allTimeHigh?.price)
                                )}
                            </p>
                        </div>
                        <div className="row">
                            <h4 className="coin-details__value-stats__sub-title">
                                All-time-high (date)
                            </h4>
                            <p className="coin-details__value-stats__sub-description">
                                {new Date(
                                    coinDetails?.allTimeHigh?.timestamp * 1000
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    </section>
                    <section className="coin-details__supply-stats">
                        <h2 className="coin-details__supply-stats__title">
                            {coinDetails.name} supply state
                        </h2>
                        <p className="coin-details__supply-stats__description">
                            An overwiev showing {coinDetails.name} supply state
                        </p>
                        <div className="row">
                            <h4 className="coin-details__supply-stats__sub-title">
                                Approved Supply
                            </h4>
                            <p className="coin-details__supply-stats__sub-description">
                                {coinDetails?.supply?.confirmed ? " YES" : "NO"}
                            </p>
                        </div>
                        <div className="row">
                            <h4 className="coin-details__supply-stats__sub-title">
                                Total Supply
                            </h4>
                            <p className="coin-details__supply-stats__sub-description">
                                {coinDetails?.supply?.total
                                    ? millify(
                                          parseInt(coinDetails?.supply?.total)
                                      )
                                    : "--"}
                            </p>
                        </div>
                        <div className="row">
                            <h4 className="coin-details__supply-stats__sub-title">
                                Circulating Supply
                            </h4>
                            <p className="coin-details__supply-stats__sub-description">
                                {coinDetails?.supply?.circulating
                                    ? millify(
                                          parseInt(
                                              coinDetails?.supply?.circulating
                                          )
                                      )
                                    : "--"}
                            </p>
                        </div>
                        <div className="row">
                            <h4 className="coin-details__supply-stats__sub-title">
                                Supply Limit
                            </h4>
                            <p className="coin-details__supply-stats__sub-description">
                                {coinDetails?.supply?.max
                                    ? millify(
                                          parseInt(coinDetails?.supply?.max)
                                      )
                                    : "--"}
                            </p>
                        </div>
                    </section>
                    <section className="coin-details__what-is">
                        <h2 className="coin-details__what-is__title">
                            What is {coinDetails.name}
                        </h2>
                        {coinDetails?.description
                            ? HTMLparser(coinDetails.description)
                            : null}
                    </section>
                    <section className="coin-details__links">
                        <h2 className="coin-details__links__title">
                            {coinDetails.name} useful links
                        </h2>
                        {coinDetails?.links?.map((link) => (
                            <div className="row" key={link.url}>
                                <h4 className="coin-details__links__sub-title">
                                    {link.type}
                                </h4>
                                <a href={link.url} target="__blank">
                                    <p className="coin-details__links__sub-description">
                                        {link.name}
                                    </p>
                                </a>
                            </div>
                        ))}
                    </section>
                </div>
                {news?.length > 0 ? (
                    <section className="coin-details__news">
                        <h2 className="coin-details__news__title">
                            The most important news regarding {coinDetails.name}
                        </h2>
                        <ul className="coin-details__news__list">
                            {news?.map((n) => (
                                <li
                                    className="coin-details__news__list-item"
                                    key={n.url}
                                >
                                    <NewsItem news={n} />
                                </li>
                            ))}
                        </ul>
                    </section>
                ) : null}
            </div>
        </>
    );
};

export default CoinDetails;
