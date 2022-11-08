import React from "react"

interface Options {
    option: string,
    value: string
}

interface ChangeButtonsProps {
    handler: (value: string) => void,
    options: Options[],
    state: string,
    label: string
}

export { ChangeButtonsProps }