import { describe, expect, test } from "@jest/globals";
import { render } from "@testing-library/react";
import ChangeButtons from "./component";

describe("rendering", () => {
    test("render", () => {
        render(<ChangeButtons />);
    });
});
