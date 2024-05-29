const { verifyToken, store_user_verification } = require("../../UTILS/endpoints.UTIL")
const User = require("../../DB/models/user.MODEL")
const Store = require("../../DB/models/store.MODEL")
const Client = require("../../DB/models/client.MODEL")
const bcrypt = require("bcrypt")
const Contable = require("../../DB/models/contable.MODEL")
const Bills = require("../../DB/models/bills.MODEL")

const createBill = async (req, res) => {
    const { billTitle, billAmount, idContable, dateContable } = req.body
    const date = new Date().toString().split(" ", 4)
    console.log(dateContable)
    const dateVerify = date.map((e, i) => {
        const verify = dateContable.split(" ", 4)[i] === e
        if (!verify) return "Error"
        return "correct"

    })
    if (dateVerify.includes("Error")) return res.status(400).send({ msgERR: "No coinciden las fechas" })
    const newBill = new Bills({
        titleBill: billTitle,
        totalBill: billAmount,
        dateBill: new Date(),
        contableBill: idContable,
    })
    const saveBill = await newBill.save()
    const contable = await Contable.findById(idContable)
    const findBills = await Bills.find({contableBill: idContable })
    contable.bills.push(saveBill)
    await contable.save()
    const filterBillsForSend = findBills.filter(b => b.dateBill.split(" ", 4).toString() === date.toString())
    res.status(200).send({
        msgOK: "Bill added successfully",
        bills: filterBillsForSend
    })

}

const removebill = async (req, res) => {
    const { billId, idContable } = req.body
    const { store, user } = req.user_store
    const findBill = await Bills.findByIdAndDelete(billId)
    const findContable = await Contable.findById(idContable)
    console.log(findContable)
    const findAndDeleteBill = findContable.bills.filter(e => e != billId)
    findContable.bills = findAndDeleteBill
    await findContable.save()
    const newContable = await Contable.findById(idContable).populate("bills")
    res.status(200).send({
        msgOK: "Bill deleted successfully",
        contable: newContable
    })
}

const editBill = async (req, res) => {
    const { billId, billTitle, billAmount, descriptionBill, contableId } = req.body
    await Bills.findByIdAndUpdate(billId, { titleBill: billTitle, descriptionBill: descriptionBill, totalBill: billAmount }, { new: true })
    const contable = await Contable.findById(contableId).populate("bills")
    res.status(200).send({
        msgOK: "Bill edited successfully",
        bill: contable.bills
    })
}

const getBills = async (req, res) => {
    const { bills } = req.body
    let billsToReturn = []
    if(bills){
        bills.forEach(async (e) => {
            const myBillFind = await Bills.findById(e)
            billsToReturn.push(myBillFind)
            if(billsToReturn.length === bills.length) {
               return res.status(200).send({msgOK: "Bills getted succesfully", bills: billsToReturn})
            }
        })
    }

    
    
}



module.exports = { createBill, removebill, editBill, getBills }