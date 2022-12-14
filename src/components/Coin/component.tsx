import React from "react";
import "./style.css";
import { CoinsProps } from "./types";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { fetchCoinNews } from "../../services/slices/coinNewsSlice";
import checkNumbers from "../../services/Format/CheckNumbers/service";

const Coins: React.FC<CoinsProps> = ({ coin }) => {
    const change = parseFloat(coin.change);
    const dispatch = useAppDispatch();

    const handleFetchCoinNews = (coin: string) => dispatch(fetchCoinNews(coin));
    return (
        <>
            <Link
                to={`/cryptocurrencies/${coin.uuid}`}
                onClick={() => handleFetchCoinNews(coin.name)}
            >
                <article key={coin.uuid} className="coin__wrapper">
                    <div className="coin__upper-section row">
                        <h3 className="coin__name">
                            {coin.rank}. {coin.name}
                        </h3>
                        <img
                            src={coin.iconUrl}
                            alt="coin logo image"
                            className="coin__logo"
                        />
                    </div>
                    <div className="coin__description">
                        <div className="row">
                            <h4>Price</h4>
                            <p>{checkNumbers(coin.price)}</p>
                        </div>
                        <div className="row">
                            <h4>Daily change</h4>
                            <p
                                className={
                                    change === 0
                                        ? "coin__change"
                                        : change < 0
                                        ? "coin__change coin__change__red"
                                        : "coin__change coin__change__green"
                                }
                            >
                                {change}%
                            </p>
                        </div>
                        <div className="row">
                            <h4>Market cap</h4>
                            <p>{checkNumbers(coin.marketCap)}</p>
                        </div>
                    </div>
                </article>
            </Link>
        </>
    );
};

export default Coins;
