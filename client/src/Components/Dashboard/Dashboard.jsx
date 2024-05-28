import React, { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";
import { GetMyStores } from "../../Helpers/Connections";
import { useNavigate } from "react-router-dom";
function Dashboard({ storeState }) {
  const { myAccount, setMyAccount } = useContext(UserContext);
  const { myStores, setMyStores } = useContext(StoreContext);
  const navigate = useNavigate();
  useEffect(() => {
    const GetStoresByApi = async () => {
      if (myAccount) {
        const storesData = await GetMyStores();
        setMyStores(storesData.data);
      }
    };

    GetStoresByApi()
  }, [myAccount]);

  useEffect(() => {
    if (myStores) {
      if (myStores.length <= 0) {
        window.localStorage.setItem("createStoreTutorial", "false");
        navigate("/dashboard");
      }
    }
  }, [myStores]);

  const handleLogOut = async () => {
    window.localStorage.removeItem("createStoreTutorial")
    window.localStorage.removeItem("u53r")
    setMyAccount(null)
    setMyStores(null);
    navigate("/login");
  }

  return <div>
    <button onClick={handleLogOut}>logout</button>
    {
      myStores &&
      myStores.map((store, i) => {
        return <div key={i}>Nombre de la tienda: {store.StoreName}</div>;  
      })
    }
  </div>;
}

export default Dashboard;
