const { default: mongoose } = require("mongoose");
const { api } = require("../helpers/createuser.helper")
const server = require("../app")

let userToken;
beforeEach(async () => {
    const user = {
        username: "JuanAndres",
        password: "210981274",
    }
    const res = await api.post("/api/users/login")
        .send(user)
        .expect(200)
    userToken = res.body.token
})

test("Creando una tienda para el usuario", async () => {

    const store = {
        storename: "La tienda de juan", 
        storepassword: "2195192"
    }

    const res = await api.post("/api/stores/create")
        .set("Authorization", "Bearer " + userToken)
        .send(store)
        .expect(200)

        expect(res.body.msgok).toBe("Store created successfully")
})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})