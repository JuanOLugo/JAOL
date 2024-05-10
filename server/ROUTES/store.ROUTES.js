const { Router } = require("express")
const jwt = require("jsonwebtoken")
const Store = require("../DB/models/store.MODEL")
const User = require("../DB/models/user.MODEL")
const bcrypt = require("bcrypt")
const storeR = Router()

storeR.post("/create", async (req, res, next) => {
    const { storename, storepassword } = req.body
    const authorization = req.get("Authorization")
    let token;
    //Verificamos que la authorization empiece en Bearer
    if (authorization.startsWith("Bearer")) token = authorization.split(" ")[1]
    //Decodificamos el token
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    //Verificamos que el token sea valido
    if (!token || !decodedToken.id) return res.status(401).json({ error: "token missing or invalid" })
    //Verificamos que el usuario exista
    const user = await User.findById(decodedToken.id)
    if (!user) return res.status(401).json({ error: "user not found" })

    //Creacion de la tienda

    // Buscamos las tiendas del usuario
    const userStores = await Store.find({ StoreOwner: user._id })
    console.log(userStores)
    //Verificamos si hay una tienda con el mismo nombre
    const verifyIfUserHaveThisStore = userStores.find(e => {
        return e.StoreName === storename
    })
    console.log(verifyIfUserHaveThisStore)
    //Incriptamos la contraseña de la tienda
    const storePassHash = await bcrypt.hash(storepassword, 10)
    //enviamos un error en caso de que el usuario ya tenga la tienda
    if (verifyIfUserHaveThisStore) return res.status(400).json({ error: "user already have this store" })
    else {
        //Creamos una nueva tienda para el usuario
        console.log(user._id)
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
        const findUserStores = await Store.find({ StoreOwner: user.id }).populate("StoreOwner", {id: 1, userName: 1})
        // enviamos todas las tiendas del usuario
        res.status(200).send({
            msgOK: "Store created successfully",
            userStores: findUserStores
        })
    }
})

module.exports = storeR