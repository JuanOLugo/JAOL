const { Router } = require('express')
const jwt = require('jsonwebtoken')
const User = require("../DB/models/user.MODEL")
const bcrypt = require('bcrypt')
const userR = Router()

//create account
userR.post("/createuser", async (req, res, next) => {
    const { username, password, usertype } = req.body
    // verificamos que todo llegue a la perfeccion
    if (!username || !password || !usertype) {
        //Enviamos codigo de error en caso de que no llegue todo
        res.status(401).send({ msgERR: "NO HA COMPETADO TODOS LOS CAMPOS, POR FAVOR COMPLETELOS" })
    } else {
        //Verificamos si el usuario existe
        const verifyIfUserExists = await User.findOne({ userName: username })

        if (!verifyIfUserExists) {
            //Incriptamos la contraseña
            const passHash = await bcrypt.hash(password, 10)
            //Creamos un nuevo usuario
            const newUser = new User({
                userName: username,
                password: passHash,
                typeAccount: usertype
            })
            //Guardamos el nuevo usuario en la base de datos
            const newUserAdd = await newUser.save()
            //Creamos el token para el usuario
            const userPayload = {
                userName: newUser.userName,
                typeAccount: newUser.typeAccount,
                id: newUser.id,
            }
            const createUserToken = jwt.sign(userPayload, process.env.SECRET_KEY)
            //Enviamos el token al usuario junto al usuario agregado a la base de datos    
            if (createUserToken) res.status(200).send({
                msgOK: "User created successfully",
                token: createUserToken,
                user: newUserAdd
            })
            // Enviamos un mensaje de error en caso de que el nombre de usuario ya este en uso
        } else res.status(400).send({ msgERR: "Este nombre de usuario ya esta en uso!" })
    }


})
//Login account
//Remove account

//export router
module.exports = userR
