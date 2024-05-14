const { Router } = require('express')
const jwt = require('jsonwebtoken')
const User = require("../DB/models/user.MODEL")
const bcrypt = require('bcrypt')
const userR = Router()
const { userLogin, createUser } = require('../MIDDLEWARES/User/user.middle')

//create account
userR.post("/createuser", createUser)
//Login account
userR.post("/login", userLogin )

//Remove account
//No se hara

//export router
module.exports = userR
