import React from "react";
import "./style.css";
import Coin from "../Coin";
import { Top10coinsProps } from "./types";
import { useAppSelector } from "../../app/hooks";

const Top10Coins: React.FC<Top10coinsProps> = ({ coins }) => {
    const { top10coins } = useAppSelector(({ top10coins }) => top10coins);
    return (
        <main>
            <div className="container">
                <h2 className="coins__title">
                    Top 10 <span>crypto</span> by marketcap
                </h2>
                <div className="coins__wrapper">
                    {top10coins?.map((coin) => (
                        <Coin key={coin.uuid} coin={coin} />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Top10Coins;
