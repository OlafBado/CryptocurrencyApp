import React, { useState, useEffect } from 'react'

// this hook does not allow to update specified value untill specified
// time has passed
// every single time the value changes, the useEffect hook is invoked
// and updateds a new value after some time. If hook will be invoked
// during the useEffect's timeout execution, this execution will be ignored
// and new timeout will be set

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => clearTimeout(timeoutId)
    }, [value])

    return debouncedValue
}

export default useDebounce