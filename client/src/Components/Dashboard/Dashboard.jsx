import React, { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";
function Dashboard() {
  const { myAccount } = useContext(UserContext);
  const { myStores, setMyStores } = useContext(StoreContext);
  useEffect(() => {
    if (myAccount) setMyStores(myAccount.Stores);
  }, [myAccount]);

  useEffect(() => {
    console.log(myStores);
  }, [myStores]);

  return (
    <div>
    </div>
  );  
}

export default Dashboard;
