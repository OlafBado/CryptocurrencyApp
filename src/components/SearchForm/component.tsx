import React, { ReactEventHandler } from "react";
import "./style.css";
import { SearchFormProps } from "./types";
import ChangeButtons from "../ChangeButtons";
import { setInput } from "../../services/slices/coinsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const options1 = [
    {
        option: "Market cap",
        value: "marketCap",
    },
    {
        option: "Price",
        value: "price",
    },
    {
        option: "24h Volume",
        value: "24hVolume",
    },
    {
        option: "Change",
        value: "change",
    },
    {
        option: "Listed at",
        value: "listedAt",
    },
];

const options2 = [
    {
        option: "Descending",
        value: "desc",
    },
    {
        option: "Ascending",
        value: "asc",
    },
];

const SearchForm: React.FC<SearchFormProps> = ({
    handleSortBy,
    sortBy,
    direction,
    coinUrl,
    handleSearch,
    inputResult,
}) => {
    const dispatch = useAppDispatch();
    const inputValue = useAppSelector(
        ({ cryptocurrencies }) => cryptocurrencies.input
    );
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(setInput(e.currentTarget.value));
    return (
        <form onSubmit={(e) => e.preventDefault()} className="search-form">
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
                    <ChangeButtons
                        handler={handleSortBy}
                        state={sortBy}
                        label="Sort By"
                        options={options1}
                    />
                    <ChangeButtons
                        handler={handleSortBy}
                        state={direction}
                        label="Direction"
                        options={options2}
                    />
                </div>
            </fieldset>
        </form>
    );
};

export default SearchForm;
