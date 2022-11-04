interface DropdownProps {
    label: string,
    options: DropdownPropsOptions[]
}

interface DropdownPropsOptions {
    option: string,
    value: string
}

export { DropdownProps }