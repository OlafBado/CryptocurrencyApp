import React, { useEffect } from "react";
import "./style.css";
import SearchForm from "../SearchForm";
import Coin from "../Coin";
import Spinner from "../Spinner";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    fetchCryptocurrencies,
    getMore,
} from "../../services/slices/coinsSlice";
import { FETCH_STATE } from "../../services/constants";

const Cryptocurrencies = () => {
    const dispatch = useAppDispatch();
    const { coins, coinsStatus, total } = useAppSelector(
        ({ cryptocurrencies }) => cryptocurrencies
    );

    useEffect(() => {
        if (!coins.length) {
            dispatch(fetchCryptocurrencies());
        }
    }, []);

    const handleFetchMore = () => {
        dispatch(getMore());
        dispatch(fetchCryptocurrencies());
    };

    return (
        <main>
            <div className="container">
                <h2 className="coins__title">
                    Find you <span>crypto</span>currency
                </h2>
                <SearchForm />
                {coins.length === 0 && coinsStatus !== FETCH_STATE.loading ? (
                    <h3 className="coins__sub-title">
                        This coin does not exist...
                    </h3>
                ) : (
                    <div className="coins__wrapper">
                        {coins?.map((coin) => (
                            <Coin key={coin.uuid} coin={coin} />
                        ))}
                    </div>
                )}
                <div className="coins__load-more__wrapper">
                    {coinsStatus === FETCH_STATE.loading ? (
                        <Spinner />
                    ) : total === coins.length ? (
                        <button
                            className=" btn coins__load-more coins__load-more--disabled"
                            disabled
                        >
                            No more coins
                        </button>
                    ) : (
                        <button
                            className="btn coins__load-more"
                            onClick={handleFetchMore}
                        >
                            Load more
                        </button>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Cryptocurrencies;
