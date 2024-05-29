import { createContext, useState } from "react"

const StoreContext = createContext()


function StoreContextProvider({ children }) {

    const [myStores, setMyStores] = useState(null)
    const [myContable, setmyContable] = useState(null)
    const [myBills, setmyBills] = useState(null)

    return (
        <StoreContext.Provider value={{ myStores, setMyStores, myContable, setmyContable, myBills, setmyBills }}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
export {StoreContext}