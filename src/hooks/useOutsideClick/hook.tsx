import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import React from 'react'

const useOutsideClick = (callback: Dispatch<SetStateAction<boolean>>) => {

    const ref = useRef() as React.MutableRefObject<HTMLElement>;

    useEffect(() => {
        const handleClick = (e: Event) => {
            if (ref.current && !e.composedPath().includes(ref.current)) {
                // console.log(e.composedPath().includes(ref.current))
                callback(false)
            }
        }
        document.addEventListener('click', handleClick)

        return () => document.removeEventListener('click', handleClick)
    }, [])

    return ref
}

export default useOutsideClick