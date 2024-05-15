const { verifyToken, store_user_verification } = require("../../UTILS/endpoints.UTIL")
const User = require("../../DB/models/user.MODEL")
const Store = require("../../DB/models/store.MODEL")
const Client = require("../../DB/models/client.MODEL")
const bcrypt = require("bcrypt")
const Contable = require("../../DB/models/contable.MODEL")
const Credit = require("../../DB/models/bills.MODEL")

const createCredit = async (req, res) => {
    const {store, user} = req.user_store
    const {idclient, idcontable, products, totalcredit, descredit} = req.body 
    const verifyClient = await Client.findById(idclient)
    console.log(verifyClient.clientStore)
    if(verifyClient.clientStore.toString() !== store.id) return res.status(401).send({msgERR: "ESTE CLIENTE NO ESTA REGISTRADO EN TU TIENDA"})
    const credit = await Credit.find({clientCredit: idclient})
    if(credit.length == 0){
        const newCredit = new Credit({
            totalcredit: totalcredit,
            descriptioncredit: descredit,
            Storecredit: store.id,
            clientCredit: verifyClient.id,
            products: [products]
        })
        const savedCredit = await newCredit.save()
        const contable = await Contable.findById(idcontable)
        contable.credits.push(savedCredit)
        const savedContable = await contable.save()
        res.status(200).send({msgOK: "CREDITO CREADO"}, savedContable )



    } 

}


module.exports = {createCredit}