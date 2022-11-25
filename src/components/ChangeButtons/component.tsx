import React from "react";
import "./style.css";
import { ChangeButtonsProps } from "./types";

const ChangeButtons: React.FC<ChangeButtonsProps> = ({
    options,
    label,
    handler,
    state,
}) => {
    return (
        <div className="select__wrapper">
            <h3 className="select__label">{label}</h3>
            <div className="select__button__wrapper">
                {options.map(({ value, option }) => (
                    <button
                        key={value}
                        className={
                            state === value
                                ? "select__button btn"
                                : "select__button"
                        }
                        type="button"
                        value={value}
                        onClick={handler}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChangeButtons;
