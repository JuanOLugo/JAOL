import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";
import { GetMyStores } from "../../Helpers/Connections";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import GrandDash from "./GrandDash"
function Dashboard() {
  const { myAccount, setMyAccount } = useContext(UserContext);
  const { myStores, setMyStores } = useContext(StoreContext);
  const navigate = useNavigate();
  const [isNavOpen, setisNavOpen] = useState(true)
  useEffect(() => {
    const GetStoresByApi = async () => {
      if (myAccount) {
        const storesData = await GetMyStores();
        setMyStores(storesData.data);
      }
    };

    GetStoresByApi();
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
    window.localStorage.removeItem("createStoreTutorial");
    window.localStorage.removeItem("u53r");
    setMyAccount(null);
    setMyStores(null);
    navigate("/login");
  };

  return <div className="bg-primary-100 h-screen flex justify-evenly  items-center">
    <Navbar setNavOpen={setisNavOpen} navOpen={isNavOpen}/>
    <GrandDash setNavOpen={setisNavOpen} navOpen={isNavOpen} />
  </div>;
}

export default Dashboard;
