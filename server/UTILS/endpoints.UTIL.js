const jwt = require("jsonwebtoken")
const User = require("../DB/models/user.MODEL")
const Store = require("../DB/models/store.MODEL")
const verifyToken = async (authorization) => {
    //Verificamos la autorizacion
    let token;
    if (authorization.startsWith("Bearer")) token = authorization.split(" ")[1]
    else return { msgERR: "token missing or invalid" }
    // Decodificamos el token
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    //Verificamos que el token sea valido
    if (!token || !decodedToken.id) return { msgERR: "token missing or invalid" }
    return { token, decodedToken };
}

const store_user_verification = async (userdecoded, idStore) => {
    const user = await User.findById(userdecoded.decodedToken.id)
    if (!user) return { msgERR: "user not found" }
    let store;
    if(idStore){
        store = await Store.findById(idStore)
        if (!store) return { msgERR: "store not found" }
    }else{
        return {user}
    }

    return {
        user,
        store
    }
        
}

module.exports = {
    verifyToken, 
    store_user_verification
}