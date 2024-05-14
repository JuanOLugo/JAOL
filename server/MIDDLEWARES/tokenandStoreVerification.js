const { verifyToken, store_user_verification } = require("../UTILS/endpoints.UTIL")

const tokenAndStoreVerify = async (req, res, next) => {
    const {idStore} = req.body
    const decodedToken = await verifyToken(req.get("Authorization"))
    const { user, store, msgERR } = await store_user_verification(decodedToken, idStore);
    if (msgERR) {
        req.error = msgERR;
        return res.status(401).send(req.error);
    }
    req.user_store = {user, store}
    next()
}

module.exports = {
    tokenAndStoreVerify
}