import { createContext, useState } from 'react'

export const HeaderContext = createContext<any>({})

export const HeaderContextProvider = ({children}: any) => {
  const [subfix, setSubfix] = useState(null)
    return <HeaderContext.Provider value={{subfix, setSubfix}}>
      {children}
    </HeaderContext.Provider>
}
