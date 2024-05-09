const supertest = require('supertest');
const server = require("../app");
const { default: mongoose } = require('mongoose');
const { createUser, api } = require("../helpers/createuser.helper")
const User = require("../DB/models/user.MODEL")

beforeEach(async () => {
    // await User.deleteMany({})
    // const userTosend = {
    //     username: "JuanAndres",
    //     password: "210981274",
    //     usertype: "Client"
    // }

    // const res = await createUser(userTosend, 200)
})

test.skip("creando un nuevo usuario", async () => {
    const userTosend = {
        username: "JuanAndres",
        password: "210981274",
        usertype: "Client"
    }

    const res = await createUser(userTosend, 200)

    expect(res.body.user.userName).toBe(userTosend.username)
})

test.skip("Verificando que no se cree un usuario con el mismo username", async () => {
    const userTosend = {
        username: "JuanAndres",
        password: "210981274",
        usertype: "Client"
    }

    const res = await createUser(userTosend, 400)

    expect(res.body.msgERR).toBe("Este nombre de usuario ya esta en uso!")
})


test.skip("Verificando que nos genera error al no enviar todo correcto", async () => {
    const userTosend = {
        username: "JuanAndres",
        password: "210981274",
    }
    const res = await createUser(userTosend, 400)
    expect(res.body.msgERR).toBe("NO HA COMPETADO TODOS LOS CAMPOS, POR FAVOR COMPLETELOS")
})

test.skip("Verificando que no se cree un usuario cuando pasamos todo pero sin contenido", async () => {
    const userTosend = {
        username: "",
        password: "",
        usertype: ""
    }
    const res = await createUser(userTosend, 400)
    expect(res.body.msgERR).toBe("NO HA COMPETADO TODOS LOS CAMPOS, POR FAVOR COMPLETELOS")
})

// login test

test.skip("Intentando logearme normalmente", async () => {
    const userTosend = {
        username: "JuanAndres",
        password: "210981274"
    }

    const res = await api.post("/api/users/login")
        .send(userTosend)
        .expect(200)
        .expect("Content-Type", /application\/json/)

        expect(res.body.token)
        console.log(res.body.token)
})

test("Iniciando sesion con el token", async () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ikp1YW5BbmRyZXMiLCJ0eXBlQWNjb3VudCI6IkNsaWVudCIsImlkIjoiNjYzZDMxZjI3NzhhYjRjMDg3M2NmYmZkIiwiaWF0IjoxNzE1Mjg2NTE0fQ.FMY-D5K_6dhETw_rpg9n0fqQDt6IHms07GvypsdnDrc"

    const res = await api.post("/api/users/login")
    .set("Authorization", "Bearer " + token)
    .expect(200)
    .expect("Content-Type", /application\/json/)
    
    expect(res.body.msgOK).toBe("User logged successfully")
})

test("Intentando iniciar sesion sin rellenar los parametros",async () => {
    const userToSend = {
        username: "dlkas",
        password: "",
    }

    const res = await api.post("/api/users/login")
    .send(userToSend)
    .expect(401)
    .expect("Content-Type", /application\/json/)

    expect(res.body.msgERR).toBe("RELLENA EL CONTENIDO" )
})

afterAll(async () => {
    mongoose.connection.close()
    server.close()
})