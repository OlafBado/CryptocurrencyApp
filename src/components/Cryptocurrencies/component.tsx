import React, { useEffect } from "react";
import "./style.css";
import SearchForm from "../SearchForm";
import Coin from "../Coin";
import Spinner from "../Spinner";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    fetchCryptocurrencies,
    getMore,
    reset,
    setCoins,
} from "../../services/slices/coinsSlice";
import useDebounce from "../../hooks/useDebounce";
import { FETCH_STATE } from "../../services/constants";

const coinsFromLocalStorage = localStorage.getItem("coins") || "[]";

const Cryptocurrencies = () => {
    const dispatch = useAppDispatch();
    const { coins, coinsStatus, direction, input, offset, sortBy, total } =
        useAppSelector(({ cryptocurrencies }) => cryptocurrencies);

    const debouncedInputValue = useDebounce(input, 400);

    useEffect(() => {
        if (coins.length === 0) {
            dispatch(fetchCryptocurrencies());
        }
    }, []);

    // useEffect(() => {
    //     localStorage.setItem("coins", JSON.stringify(coins));
    // }, [coins]);

    // useEffect(() => {
    //     console.log("normal", coins);
    //     dispatch(fetchCryptocurrencies());
    // }, [sortBy, direction, debouncedInputValue, offset]);

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
