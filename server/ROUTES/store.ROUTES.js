const { Router } = require("express")
const storeR = Router()
const { tokenAndStoreVerify } = require("../MIDDLEWARES/tokenandStoreVerification")
const { addClient, createStore, addPaymentMethod, deletePaymentMethod, deleteClient, addLog } = require("../MIDDLEWARES/Stores/store.middle")

//Create store

storeR.post("/create", createStore)

//Add payment method 

storeR.post("/payment", tokenAndStoreVerify, addPaymentMethod)

//Delete payment method

storeR.delete("/payment", tokenAndStoreVerify, deletePaymentMethod)

//Add clients

storeR.post("/client", tokenAndStoreVerify, addClient)

//delete clients

storeR.delete("/client", tokenAndStoreVerify, deleteClient)

//Add logcontable

storeR.post("/logcontable", tokenAndStoreVerify, addLog)

module.exports = storeR