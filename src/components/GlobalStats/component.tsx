import React from "react";
import "./style.css";
import formatter from "../../services/Format/Price/service";
import { useAppSelector } from "../../app/hooks";

const GlobalStats = () => {
    const { globalStats } = useAppSelector(({ globalStats }) => globalStats);

    return (
        <section className="global-stats__section">
            <div className="container">
                <h2 className="global-stats__title">Global Crypto stats</h2>
                <h3 className="best-coins__title">Best performing coins</h3>
                <div className="global-stats-coins__wrapper">
                    {globalStats?.bestCoins?.map(
                        ({ coinrankingUrl, uuid, iconUrl, name }) => {
                            return (
                                <a href={coinrankingUrl} key={uuid}>
                                    <img
                                        src={iconUrl}
                                        alt={name}
                                        className="best coin"
                                    />
                                </a>
                            );
                        }
                    )}
                </div>
                <article className="global-stats__article">
                    <div>
                        <h3 className="global-stats__article__title">
                            Total Market Cap
                        </h3>
                        <p className="global-stats__article__text">
                            {formatter(globalStats?.totalMarketCap)}
                        </p>
                        <h3 className="global-stats__article__title">
                            Total 24h Volume
                        </h3>
                        <p className="global-stats__article__text">
                            {formatter(globalStats?.total24hVolume)}
                        </p>
                        <h3 className="global-stats__article__title">
                            BTC dominance
                        </h3>
                        <p className="global-stats__article__text">
                            {globalStats?.btcDominance?.toFixed(2)}%
                        </p>
                    </div>
                    <div>
                        <h3 className="global-stats__article__title">
                            Total Coins
                        </h3>
                        <p className="global-stats__article__text">
                            {globalStats?.totalCoins}
                        </p>
                        <h3 className="global-stats__article__title">
                            Total Exchanges
                        </h3>
                        <p className="global-stats__article__text">
                            {globalStats?.totalExchanges}
                        </p>
                        <h3 className="global-stats__article__title">
                            Total Markets
                        </h3>
                        <p className="global-stats__article__text">
                            {globalStats?.totalMarkets}
                        </p>
                    </div>
                </article>
                <h3 className="newest-coins__title">Newest coins</h3>
                <div className="global-stats-coins__wrapper">
                    {globalStats?.newestCoins?.map(
                        ({ coinrankingUrl, uuid, iconUrl, name }) => {
                            return (
                                <a href={coinrankingUrl} key={uuid}>
                                    <img
                                        src={iconUrl}
                                        alt={name}
                                        className="best coin"
                                    />
                                </a>
                            );
                        }
                    )}
                </div>
            </div>
        </section>
    );
};

export default GlobalStats;
