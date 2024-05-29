import { useContext, useEffect, useState } from "react";
import { UserContext } from "./Context/UserContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginApp from "./Components/Login/LoginApp";
import Dashboard from "./Components/Dashboard/Dashboard";
import NotFound from "./Components/NotFound";
import { LoginUser } from "./Helpers/Connections";
import StoreContextProvider from "./Context/StoreContext";
import Wait from "./Components/Wait";
import StartCreatingStore from "./Components/Tutorials/StartCreatingStore";

function App() {
  const { myAccount, setMyAccount } = useContext(UserContext);
  const [waitingLogin, setwaitingLogin] = useState(false);
  const navigate = useNavigate();
  const autoLogWithToken = async () => {
    const data = await LoginUser();
    return data;
  };
  
  const createStore = window.localStorage.getItem("createStoreTutorial")
  
  useEffect(() => {
    if (window.localStorage.getItem("u53r")) {
      setwaitingLogin(true);
      autoLogWithToken()
        .then((data) => data)
        .then((data) => {
          window.localStorage.setItem("u53r", data.data.token);
          setMyAccount(data.data.user);
          setwaitingLogin(false);
          navigate("/dashboard");
        }).catch(err => {
          window.localStorage.removeItem("u53r");
          window.localStorage.removeItem("createStoreTutorial");
          window.location.reload()
        })
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {waitingLogin ? (
        <Wait />
      ) : (
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<LoginApp />} />

          <Route
            path="/dashboard"
            element={
              createStore === "true" ? (
                <StoreContextProvider>
                  <Dashboard />
                </StoreContextProvider>
              ) : (
                <StoreContextProvider>
                  <StartCreatingStore />
                </StoreContextProvider>
              )
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
