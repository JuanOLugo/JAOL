import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../Context/UserContext'
import axios from "axios"
import { StoreContext } from '../../Context/StoreContext'
function Dashboard() {
    const {myAccount} = useContext(UserContext)
    const {myStores, setMyStores} = useContext(StoreContext)
    console.log(myAccount)
    
    useEffect(() => {
        setMyStores(myAccount.Stores)

    }, [myAccount])
    useEffect(() => {
      console.log(myStores)
    }, [myStores])
    
  return (
    <div><button onClick={ async (e) => {
        await axios.post("http://localhost:3002/api/stores/create", {
            storename:"Jauncho", storepassword: "21950524"
        }, {headers: {
            Authorization: `Bearer ${window.localStorage.getItem("u53r")}`
        }})
        .then(res => res).then(data => console.log(data))
    }}>create</button></div>
  )
}

export default Dashboard