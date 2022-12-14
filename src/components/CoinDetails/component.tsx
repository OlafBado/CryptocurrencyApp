import React, { useEffect } from "react";
import "./style.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useParams } from "react-router-dom";
import LineChart from "../LineChart";
import millify from "millify";
import HTMLparser from "html-react-parser";
import ChangeButtons from "../ChangeButtons";
import NewsItem from "../NewsItem";
import Spinner from "../Spinner";
import { chartOptions, FETCH_STATE } from "../../services/constants";
import { fetchCoinDetails } from "../../services/slices/coinDetailsSlice";
import { fetchCoinHistory } from "../../services/slices/coinHistorySlice";
import { setTimePeriod } from "../../services/slices/coinHistorySlice";
import stringLength from "../../services/Format/StringLength";
import checkNumbers from "../../services/Format/CheckNumbers/service";

const CoinDetails = () => {
    const {
        coinDetails,
        coinDetailsStatus,
        timePeriod,
        coinHistory,
        news,
        dispatch,
        id,
    } = useCoinDetails();

    const handleSetTimePeriod = (e: React.MouseEvent<HTMLElement>) => {
        dispatch(setTimePeriod((e.target as any).value));
        dispatch(fetchCoinHistory(id!));
    };

    if (
        coinDetailsStatus === FETCH_STATE.loading ||
        !Object.keys(coinDetails).length
    )
        return <Spinner />;
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
                    handler={handleSetTimePeriod}
                    options={chartOptions}
                    state={timePeriod}
                    label="Select time period"
                />
                <LineChart coinHistory={coinHistory} />
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
                                {checkNumbers(coinDetails?.price)}
                            </p>
                        </div>
                        <div className="row">
                            <h4 className="coin-details__value-stats__sub-title">
                                24h Volume
                            </h4>
                            <p className="coin-details__value-stats__sub-description">
                                {checkNumbers(coinDetails["24hVolume"])}
                            </p>
                        </div>
                        <div className="row">
                            <h4 className="coin-details__value-stats__sub-title">
                                Market Cap
                            </h4>
                            <p className="coin-details__value-stats__sub-description">
                                {checkNumbers(coinDetails?.marketCap)}
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
                                {checkNumbers(coinDetails?.allTimeHigh?.price)}
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
                                {checkNumbers(coinDetails?.supply?.total)}
                            </p>
                        </div>
                        <div className="row">
                            <h4 className="coin-details__supply-stats__sub-title">
                                Circulating Supply
                            </h4>
                            <p className="coin-details__supply-stats__sub-description">
                                {checkNumbers(coinDetails?.supply?.circulating)}
                            </p>
                        </div>
                        <div className="row">
                            <h4 className="coin-details__supply-stats__sub-title">
                                Supply Limit
                            </h4>
                            <p className="coin-details__supply-stats__sub-description">
                                {checkNumbers(coinDetails?.supply?.max)}
                            </p>
                        </div>
                    </section>
                    {coinDetails?.description ? (
                        <section className="coin-details__what-is">
                            <h2 className="coin-details__what-is__title">
                                What is {coinDetails.name}
                            </h2>
                            {HTMLparser(coinDetails?.description)}
                        </section>
                    ) : null}
                    {coinDetails.links ? (
                        <section className="coin-details__links">
                            <h2 className="coin-details__links__title">
                                {coinDetails.name} useful links
                            </h2>
                            {coinDetails?.links?.map(({ url, type, name }) => (
                                <div className="row" key={url}>
                                    <h4 className="coin-details__links__sub-title">
                                        {type}
                                    </h4>
                                    <a href={url} target="__blank">
                                        <p className="coin-details__links__sub-description">
                                            {stringLength(name)}
                                        </p>
                                    </a>
                                </div>
                            ))}
                        </section>
                    ) : null}
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

export const useCoinDetails = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { coinDetails, coinDetailsStatus } = useAppSelector(
        ({ coinDetails }) => coinDetails
    );
    const { timePeriod, coinHistory, coinHistoryStatus } = useAppSelector(
        ({ coinHistory }) => coinHistory
    );
    const { news } = useAppSelector(({ coinNews }) => coinNews);

    useEffect(() => {
        dispatch(fetchCoinDetails(id!));
        dispatch(fetchCoinHistory(id!));
    }, []);

    return {
        coinDetails,
        coinDetailsStatus,
        timePeriod,
        coinHistory,
        news,
        dispatch,
        id,
    };
};

export default CoinDetails;
