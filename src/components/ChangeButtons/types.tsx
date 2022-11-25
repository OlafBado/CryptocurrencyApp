import React from "react";

interface Options {
    option: string;
    value: string;
}

interface ChangeButtonsProps {
    options: Options[];
    label: string;
    handler: (e: React.MouseEvent<HTMLElement>) => void;
    state: string;
}

export { ChangeButtonsProps };
