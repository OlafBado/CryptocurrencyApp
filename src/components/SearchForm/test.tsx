import { describe, expect, test, jest } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import SearchForm from "./component";

describe("search from", () => {
    test("", () => {
        render(<SearchForm />);
        expect(screen.getByRole("form")).toBeTruthy();
    });
});
