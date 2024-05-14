const { Router } = require("express")
const storeR = Router()
const {addClient, createStore, addPaymentMethod, deletePaymentMethod, deleteClient, addLog} = require("../MIDDLEWARES/Stores/store.middle")

//Create store

storeR.post("/create", createStore)

//Add payment method 

storeR.post("/payment", addPaymentMethod )

//Delete payment method

storeR.delete("/payment", deletePaymentMethod )

//Add clients

storeR.post("/client", addClient )

//delete clients

storeR.delete("/client", deleteClient)

//Add logcontable

storeR.post("/logcontable", addLog)

module.exports = storeR