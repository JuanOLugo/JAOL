import { useContext, useEffect } from "react"
import { UserContext } from "./Context/UserContext"
import { Route, Routes, useNavigate } from "react-router-dom"
import LoginApp from "./Components/Login/LoginApp"
import Dashboard from "./Components/Dashboard/Dashboard"
import NotFound from "./Components/NotFound"
import { LoginUser } from "./Helpers/Connections"
import StoreContextProvider from "./Context/StoreContext"


function App() {
  const { myAccount, setMyAccount } = useContext(UserContext)
  const navigate = useNavigate()
  const autoLogWithToken = async () => {
    const data = await LoginUser()
    return data
  }
  useEffect(() => {

    if(window.localStorage.getItem("u53r")){
      const promesa = new Promise((resolve, reject) => {
        autoLogWithToken().then(data => resolve(data))
          .catch((err => reject(err)))
      })
      promesa.then(data => data).then(data => {
        window.localStorage.setItem("u53r", data.data.token)
        setMyAccount(data.data.user)
      })
    }else{
      navigate("/login")
    }


  }, [])

  useEffect(() => {
    if (myAccount) {
      navigate("/dashboard")
    } else {
      navigate("/login")
    }
  }, [myAccount])


  return (
    <>

      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<LoginApp />} />
        <Route path="/dashboard" element={
          <StoreContextProvider>
            <Dashboard />
          </StoreContextProvider>} />
      </Routes>
    </>
  )
}

export default App
