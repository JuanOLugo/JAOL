const { verifyToken, store_user_verification } = require("../../UTILS/endpoints.UTIL")
const User = require("../../DB/models/user.MODEL")
const Store = require("../../DB/models/store.MODEL")
const Client = require("../../DB/models/client.MODEL")
const bcrypt = require("bcrypt")
const Contable = require("../../DB/models/contable.MODEL")
const Bills = require("../../DB/models/bills.MODEL")

const createBill = async (req, res) => {
    const { billTitle, billAmount, idStore, idContable, dateContable } = req.body
    const {store, user} = req.user_store
    const date = new Date().toString().split(" ", 4)

    const dateVerify = date.map((e, i) => {
        const verify = dateContable.split(" ", 4)[i] === e
        if (!verify) return "Error"
        return "correct"

    })
    if (dateVerify.includes("Error")) return res.status(400).send({msgERR: "No coinciden las fechas"}) 
    const newBill = new Bills({
        titleBill: billTitle,
        totalBill: billAmount,
        dateBill: new Date()
    })
    const saveBill = await newBill.save()
    const contable = await Contable.findById(idContable)
    contable.bills.push(saveBill)
    await contable.save()

    const findContable = await Contable.findById(idContable).populate("bills")
    res.status(200).send({
        msgOK: "Bill added successfully",
        contable: findContable
    })

}

const removebill = async (req, res) => {
    const {billId, idContable} = req.body
    const {store, user} = req.user_store
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
    const {billId, billTitle, billAmount, descriptionBill, contableId} = req.body
    await Bills.findByIdAndUpdate(billId, {titleBill: billTitle, descriptionBill: descriptionBill, totalBill: billAmount}, {new: true})
    const contable = await Contable.findById(contableId).populate("bills")
    res.status(200).send({
        msgOK: "Bill edited successfully",
        bill: contable.bills
    })
}

module.exports = { createBill, removebill, editBill  }