const supertest = require('supertest');
const server = require("../app");
const { default: mongoose } = require('mongoose');
const { createUser, api } = require("../helpers/createuser.helper")



test("creando un nuevo usuario", async () => {
    const userTosend = {
        username: "JuanAndres",
        password: "210981274",
        usertype: "Client"
    }

    const res = await createUser(userTosend, 200)

    expect(res.body.user.userName).toBe(userTosend.username)
})

test("Verificando que no se cree un usuario con el mismo username", async () => {
    const userTosend = {
        username: "JuanAndres",
        password: "210981274",
        usertype: "Client"
    }

    const res = await createUser(userTosend, 400)

    expect(res.body.msgERR).toBe("Este nombre de usuario ya esta en uso!")
})


afterAll(async () => {
    mongoose.connection.close()
    server.close()
})