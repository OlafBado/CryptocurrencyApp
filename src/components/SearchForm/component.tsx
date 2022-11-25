import React, { ReactEventHandler } from "react";
import "./style.css";
import ChangeButtons from "../ChangeButtons";
import { setInput } from "../../services/slices/coinsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { SORT_BY_OPTIONS, DIRECTION_OPTIONS } from "../../services/constants";

const SearchForm = () => {
    const dispatch = useAppDispatch();
    const inputValue = useAppSelector(
        ({ cryptocurrencies }) => cryptocurrencies.input
    );
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(setInput(e.currentTarget.value));
    const handleSubmit = (e: React.FormEvent) => e.preventDefault();
    return (
        <form onSubmit={handleSubmit} className="search-form">
            <fieldset className="search-form__fieldset">
                <input
                    autoFocus
                    placeholder="Search by name or symbol..."
                    className="search-form__input"
                    value={inputValue}
                    type="text"
                    onChange={handleInput}
                    id="crypto-input"
                />
                <div className="search-form__dropdowns-wrapper">
                    <ChangeButtons label="Sort By" options={SORT_BY_OPTIONS} />
                    <ChangeButtons
                        label="Direction"
                        options={DIRECTION_OPTIONS}
                    />
                </div>
            </fieldset>
        </form>
    );
};

export default SearchForm;
