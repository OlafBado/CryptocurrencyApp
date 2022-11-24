import React from "react";
import "./style.css";
import { ChangeButtonsProps } from "./types";
import { setSortBy, setDirection } from "../../services/slices/coinsSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

const ChangeButtons: React.FC<ChangeButtonsProps> = ({
    handler,
    options,
    state,
    label,
}) => {
    const dispatch = useAppDispatch();
    const direction = useAppSelector(
        ({ cryptocurrencies }) => cryptocurrencies.direction
    );
    const sortBy = useAppSelector(
        ({ cryptocurrencies }) => cryptocurrencies.sortBy
    );
    console.log(direction, sortBy);
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
                        // onClick={(e) => handler(e.currentTarget.value)}
                        onClick={(e) =>
                            label === "Direction"
                                ? dispatch(setDirection(e.currentTarget.value))
                                : dispatch(setSortBy(e.currentTarget.value))
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
