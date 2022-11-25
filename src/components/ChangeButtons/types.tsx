import React from "react";

interface Options {
    option: string;
    value: string;
}

interface ChangeButtonsProps {
    options: Options[];
    label: string;
}

export { ChangeButtonsProps };
