import React from "react";
import "./style.css";
import { ChangeButtonsProps } from "./types";
import { setSortBy, setDirection } from "../../services/slices/coinsSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

const ChangeButtons: React.FC<ChangeButtonsProps> = ({ options, label }) => {
    const dispatch = useAppDispatch();
    const { direction, sortBy } = useAppSelector(
        ({ cryptocurrencies }) => cryptocurrencies
    );
    const handleSetSortBy = (e: React.MouseEvent<HTMLElement>) =>
        dispatch(setSortBy((e.target as any).value));
    const handleSetDirection = (e: React.MouseEvent<HTMLElement>) =>
        dispatch(setDirection((e.target as any).value));
    return (
        <div className="select__wrapper">
            <h3 className="select__label">{label}</h3>
            <div className="select__button__wrapper">
                {options.map(({ value, option }) => (
                    <button
                        key={value}
                        className={
                            direction === value || sortBy === value
                                ? "select__button btn"
                                : "select__button"
                        }
                        type="button"
                        value={value}
                        onClick={
                            label === "Direction"
                                ? handleSetDirection
                                : handleSetSortBy
                        }
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChangeButtons;
