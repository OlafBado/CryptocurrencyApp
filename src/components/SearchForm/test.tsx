import { describe, expect, test, jest } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import SearchForm from "./component";
import { renderWithProviders } from "../../../test-utils";

describe("search from", () => {
    test("render", () => {
        renderWithProviders(<SearchForm />);
        expect(screen.getByRole("group")).toBeTruthy();
    });
});
