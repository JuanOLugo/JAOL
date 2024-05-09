const supertest = require('supertest');
const server = require("../app");
const api = supertest(server)

const createUser = async (tosend, code) => {
    const response = await api.post("/api/users/createuser")
    .send(tosend)
    .expect(code)

    return response
}

module.exports = {
    createUser, 
    api
}