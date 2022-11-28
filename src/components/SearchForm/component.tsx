import React from "react";
import "./style.css";
import ChangeButtons from "../ChangeButtons";
import {
    setInput,
    setSortBy,
    setDirection,
    fetchCryptocurrencies,
} from "../../services/slices/coinsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { SORT_BY_OPTIONS, DIRECTION_OPTIONS } from "../../services/constants";
import { useDebouncedCallback } from "use-debounce";

const SearchForm = () => {
    const dispatch = useAppDispatch();

    const { input, sortBy, direction } = useAppSelector(
        ({ cryptocurrencies }) => cryptocurrencies
    );
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(setInput(value));
        handleDebounceInput();
    };

    const handleDebounceInput = useDebouncedCallback(() => {
        dispatch(fetchCryptocurrencies());
    }, 300);

    const handleSubmit = (e: React.FormEvent) => e.preventDefault();

    const handleSetSortBy = (e: React.MouseEvent<HTMLElement>) => {
        const value = (e.target as any).value;
        if (value === sortBy) return;
        dispatch(setSortBy(value));
        dispatch(fetchCryptocurrencies());
    };

    const handleSetDirection = (e: React.MouseEvent<HTMLElement>) => {
        const value = (e.target as any).value;
        if (value === direction) return;
        dispatch(setDirection(value));
        dispatch(fetchCryptocurrencies());
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <fieldset className="search-form__fieldset">
                <input
                    autoFocus
                    placeholder="Search by name or symbol..."
                    className="search-form__input"
                    value={input}
                    type="text"
                    onChange={handleInput}
                    id="crypto-input"
                />
                <div className="search-form__dropdowns-wrapper">
                    <ChangeButtons
                        label="Sort By"
                        options={SORT_BY_OPTIONS}
                        handler={handleSetSortBy}
                        state={sortBy}
                    />
                    <ChangeButtons
                        label="Direction"
                        options={DIRECTION_OPTIONS}
                        handler={handleSetDirection}
                        state={direction}
                    />
                </div>
            </fieldset>
        </form>
    );
};

export default SearchForm;
