const { verifyToken, store_user_verification } = require("../../UTILS/endpoints.UTIL")
const User = require("../../DB/models/user.MODEL")
const Store = require("../../DB/models/store.MODEL")
const Client = require("../../DB/models/client.MODEL")
const bcrypt = require("bcrypt")
const Contable = require("../../DB/models/contable.MODEL")


const createStore = async (req, res, next) => {
    const { storename, storepassword } = req.body
    let userDecoded;
    try {
        userDecoded = await verifyToken(req.get("Authorization"))
    } catch (error) {
        res.status(400).send(error.msgERR)
    }
    //Verificamos que el usuario exista
    const user = await User.findById(userDecoded.decodedToken.id)
    if (!user) return res.status(401).json({ error: "user not found" })

    //Creacion de la tienda

    // Buscamos las tiendas del usuario
    const userStores = await Store.find({ StoreOwner: user._id })

    //Verificamos si hay una tienda con el mismo nombre
    const verifyIfUserHaveThisStore = userStores.find(e => {
        return e.StoreName === storename
    })
    //Incriptamos la contraseña de la tienda
    const storePassHash = await bcrypt.hash(storepassword, 10)
    //enviamos un error en caso de que el usuario ya tenga la tienda
    if (verifyIfUserHaveThisStore) return res.status(400).json({ error: "user already have this store" })
    else {
        //Creamos una nueva tienda para el usuario
        const newStore = new Store({
            StoreName: storename,
            StoreOwner: user._id,
            StorePassword: storePassHash
        })
        const storeSaved = await newStore.save()
        user.Stores.push(storeSaved._id)
        try {
            await user.save()
        } catch (error) {
            console.log(error)
        }
        const findUserStores = await Store.find({ StoreOwner: user.id }).populate("StoreOwner", { id: 1, userName: 1 })
        // enviamos todas las tiendas del usuario
        res.status(200).send({
            msgOK: "Store created successfully",
            userStores: findUserStores
        })
    }
}

const getMyStores = async (req, res) => {
    const {user} = req.user_store
    const stores = await Store.find({ StoreOwner: user._id }).populate("StoreContableLog")
    res.status(200).send(stores)
}

const addPaymentMethod = async (req, res) => {
    const { paymentName, paymentDescription, idStore } = req.body
    const { store } = req.user_store
    try {

        store.StorePaymentMethod.push({
            paymentName,
            paymentDescription
        })
        await store.save()

        res.status(200).send({
            msgOK: "Payment method added successfully"
        })
    } catch (error) {
        res.status(400).send(error)
    }
}

const deletePaymentMethod = async (req, res) => {
    const { paymentMethodID } = req.body
    const { store } = req.user_store
    try {
        const filteringMethods = store.StorePaymentMethod.filter(e => e.id !== paymentMethodID)
        store.StorePaymentMethod = filteringMethods
        store.save()
        res.status(200).send({
            msgOK: "Payment method deleted successfully"
        })
    } catch (error) {
        res.status(400).send(error)
    }
}

const addClient = async (req, res) => {
    const { clientName } = req.body
    const { user, store } = req.user_store

    try {
        const newClient = new Client({ clientName, clientStore: store.id })
        const clientSaved = await newClient.save()
        store.StoreClients.push(clientSaved)
        await store.save()
        const stores = await Store.find({ StoreOwner: user.id }).populate("StoreClients")
        res.status(200).send({
            msgOK: "Client added successfully",
            stores
        })
    } catch (err) {
        console.log(err)
    }

}

const deleteClient = async (req, res) => {
    const { idClient } = req.body
    const { user, store } = req.user_store
    try {
        const filteringClients = store.StoreClients.filter(e => e._id.toString() !== idClient)
        store.StoreClients = filteringClients
        await store.save()
        await Client.findByIdAndDelete(idClient)
        const stores = await Store.find({ StoreOwner: user.id }).populate("StoreClients", { clientName: 1 })
        res.status(200).send({
            msgOK: "Client deleted successfully",
            stores
        })
    } catch (err) {
        console.log(err)
    }
}

const addLog = async (req, res) => {
    const { user, store } = req.user_store

    const myStorePopulate = await store.populate("StoreContableLog")
    const theDate = new Date().toString().split(" ", 4)
    const findIfExistLog = myStorePopulate.StoreContableLog.map((e, i) => {
        const date = e.date.split(" ", 4)
        return date.toString() === theDate.toString()
    })

    console.log(findIfExistLog)

    if (!findIfExistLog[0]) {
        const newLog = new Contable({
            date: new Date(),
            storeContable: store.id
        })
        const savedLog = await newLog.save()
        store.StoreContableLog.push(savedLog.id)
        await store.save()
        res.status(200).send({
            msgOK: "Log added successfully",
            savedLog
        })
    } 
    
}

const getLog = async (req, res) => {
    const { store } = req.user_store
    const {idLog} = req.body

    const findContable = await Contable.find({storeContable: store._id})
    const findContableone = findContable.filter(e => e._id.toString() === idLog)
    if (findContableone.length === 0) return res.status(400).send({msgERR: "No Contables found"})
    res.status(200).send({contable: findContableone[0]})
}


module.exports = { addClient, createStore, addPaymentMethod, deletePaymentMethod, deleteClient, addLog, getMyStores, getLog}