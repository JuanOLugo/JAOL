const { Router } = require("express")
const contaR = Router()
const {createBill, removebill, editBill} = require("../MIDDLEWARES/Stores/bills.middle")
const {createCredit} = require("../MIDDLEWARES/Stores/credits.middle")
const {tokenAndStoreVerify} = require("../MIDDLEWARES/tokenandStoreVerification")
contaR.post("/addbill",tokenAndStoreVerify, createBill )
contaR.post("/deleteBill", tokenAndStoreVerify, removebill )
contaR.post("/updateBill", tokenAndStoreVerify, editBill )
contaR.post("/newcredit", tokenAndStoreVerify, createCredit)
module.exports = contaR