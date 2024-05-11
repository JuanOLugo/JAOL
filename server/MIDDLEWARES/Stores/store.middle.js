const { verifyToken, store_user_verification } = require("../../UTILS/verifyToken.UTIL")
const User = require("../../DB/models/user.MODEL")
const Store = require("../../DB/models/store.MODEL")
const Client = require("../../DB/models/client.MODEL")
const bcrypt = require("bcrypt")


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

const addPaymentMethod = async (req, res) => {
    const { paymentName, paymentDescription, idStore } = req.body
    try {
        const userDecoded = await verifyToken(req.get("Authorization"))
        const {user, store, msgERR} = await store_user_verification(userDecoded, idStore);
        if(msgERR) return console.log(msgERR);
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
    const { paymentMethodID, idStore } = req.body
    try {
        const userDecoded = await verifyToken(req.get("Authorization"))
        const {user, store, msgERR} = await store_user_verification(userDecoded, idStore);
        if(msgERR) return console.log(msgERR);
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
    const { idStore, clientName } = req.body

    try {
        const userDecoded = await verifyToken(req.get("Authorization"))
        const {user, store, msgERR} = await store_user_verification(userDecoded, idStore);
        if(msgERR) return console.log(msgERR);
        const newClient = new Client({ clientName })
        const clientSaved = await newClient.save()
        store.StoreClients.push(clientSaved)
        await store.save()
        const stores = await Store.find({ StoreOwner: user.id }).populate("StoreClients", { clientName: 1 })
        res.status(200).send({
            msgOK: "Client added successfully",
            stores
        })
    } catch (err) {
        console.log(err)
    }

}

const deleteClient = async (req, res) => {
    const { idClient, idStore } = req.body
    try {
        const userDecoded = await verifyToken(req.get("Authorization"))
        const {user, store, msgERR} = await store_user_verification(userDecoded, idStore);
        if(msgERR) return console.log(msgERR);
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

module.exports = { addClient, createStore, addPaymentMethod, deletePaymentMethod, deleteClient}