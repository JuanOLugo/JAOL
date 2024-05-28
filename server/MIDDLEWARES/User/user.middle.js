const User = require("../../DB/models/user.MODEL")
const bcrypt = require("bcrypt")
const {verifyToken} = require("../../UTILS/endpoints.UTIL")
const jwt = require("jsonwebtoken")

const userLogin = async (req, res, next) => {
    const { username, password } = req.body

    const authorization = req.get("Authorization")
    if (!authorization) {
        if (!username || !password) res.status(401).send({ msgERR: "RELLENA EL CONTENIDO" })
        else {
            const verifyIfUserExists = await User.findOne({ userName: username }).populate({path: "Stores", select: "-StorePassword"}).exec()
            if (!verifyIfUserExists) {
                res.status(400).send({ msgERR: "Credenciales incorrectas" })
            } else {
                const verifyPassword = await bcrypt.compare(password, verifyIfUserExists.password)
                if(!verifyPassword) return res.status(400).send({msgERR: "Credenciales incorrectas"})
                if (verifyPassword) { 
                    const userPayload = {
                        userName: verifyIfUserExists.userName,
                        typeAccount: verifyIfUserExists.typeAccount,
                        id: verifyIfUserExists.id,
                    }
                    const createUserToken = jwt.sign(userPayload, process.env.SECRET_KEY)
                    res.status(200).send({
                        msgOK: "User logged in successfully",
                        token: createUserToken,
                        user: verifyIfUserExists
                    })
                }
            }
        }
    } else if (authorization.startsWith("Bearer")) {
        let userDecoded;
        try {
            userDecoded = await verifyToken(authorization)
        } catch (error) {
           return res.status(400).send({msgERR: "Incorrect Token"})
        }

        
        const findUser = await User.findById(userDecoded.decodedToken.id).populate({path: "Stores", select: "-StorePassword"}).exec()
        
        if (findUser) {
            res.status(200).send({
                msgOK: "User logged successfully",
                token: userDecoded.token,
                user: findUser
            })
        } else res.status(401).send({
            msgERR: "User not found"
        })

    } else res.status(400).json({
        msgERR: "NO TOKEN PROVIDE"
    })


}

const createUser = async (req, res, next) => {
    const { username, password, usertype } = req.body
    // verificamos que todo llegue a la perfeccion
    if (!username || !password || !usertype) {
        //Enviamos codigo de error en caso de que no llegue todo
        res.status(400).send({ msgERR: "NO HA COMPETADO TODOS LOS CAMPOS, POR FAVOR COMPLETELOS" })
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
            const newUserAdd = await newUser.save({password: 0})

            res.status(200).send({
                msgOK: "User created successfully",
                user: newUserAdd
            })
            // Enviamos un mensaje de error en caso de que el nombre de usuario ya este en uso
        } else res.status(400).send({ msgERR: "Este nombre de usuario ya esta en uso!" })
    }


}

module.exports = {
    createUser, 
    userLogin
}

