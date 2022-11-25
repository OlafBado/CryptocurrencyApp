import React from "react";
import "./style.css";
import ChangeButtons from "../ChangeButtons";
import {
    setInput,
    setSortBy,
    setDirection,
} from "../../services/slices/coinsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { SORT_BY_OPTIONS, DIRECTION_OPTIONS } from "../../services/constants";

const SearchForm = () => {
    const dispatch = useAppDispatch();

    const { input, sortBy, direction } = useAppSelector(
        ({ cryptocurrencies }) => cryptocurrencies
    );
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(setInput(e.currentTarget.value));

    const handleSubmit = (e: React.FormEvent) => e.preventDefault();

    const handleSetSortBy = (e: React.MouseEvent<HTMLElement>) =>
        dispatch(setSortBy((e.target as any).value));

    const handleSetDirection = (e: React.MouseEvent<HTMLElement>) =>
        dispatch(setDirection((e.target as any).value));

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
