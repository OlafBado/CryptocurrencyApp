import React, { createContext, ReactNode, useEffect, useState } from 'react'

export const WidthContext = createContext<{width: number}>({
    width: 0
})

export const WidthContextProvider = ({children}:{children: ReactNode}) => {
    
    const [width, setWidth] = useState<number>(0)

    const getWidth = () => {
      setWidth(window.innerWidth)
    }

    useEffect(()=> {
      window.addEventListener('resize', getWidth)
      getWidth()
      return () => window.removeEventListener('resize', getWidth)
    }, [])

    return (
      <WidthContext.Provider value={{width}}>
        {children}
      </WidthContext.Provider>
        )

    }