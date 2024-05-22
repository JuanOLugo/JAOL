import { createContext, useState } from "react"

const StoreContext = createContext()


function StoreContextProvider({ children }) {

    const [myStores, setMyStores] = useState(null)

    return (
        <StoreContext.Provider value={{ myStores, setMyStores }}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
export {StoreContext}