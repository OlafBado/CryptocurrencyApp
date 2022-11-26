import { describe, expect, test, jest } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import ChangeButtons from "./component";

describe("change buttons", () => {
    const options = [
        {
            option: "a",
            value: "A",
        },
        {
            option: "b",
            value: "B",
        },
    ];
    const label = "test";
    const state = "B";
    const handler = jest.fn();

    test("render properly", () => {
        render(
            <ChangeButtons
                options={options}
                label={label}
                state={state}
                handler={handler}
            />
        );
        const button1 = screen.getByRole("button", { name: /a/i });
        const button2 = screen.getByRole("button", { name: /b/i });
        expect(screen.getByText("test")).toBeTruthy();
        expect(button1).toBeTruthy();
        expect(button1).toHaveProperty("value", options[0].value);
        expect(button2.className).toBe("select__button btn");
    });

    test("handle onclick", () => {
        render(
            <ChangeButtons
                options={options}
                label={label}
                state={state}
                handler={handler}
            />
        );
        const button = screen.getByRole("button", { name: /a/i });
        fireEvent.click(button);
        expect(handler).toBeCalledTimes(1);
    });
});
