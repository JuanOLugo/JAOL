import { createContext, useState } from "react"

const UserContext = createContext()


function UserContextProvider({ children }) {

    const [myAccount, setMyAccount] = useState(null)

    return (
        <UserContext.Provider value={{ myAccount, setMyAccount }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
export {UserContext}