import axios from "axios"
const BASE_URL = "http://localhost:3002/api/"
const headersConfig = {
    Authorization: "Bearer " + window.localStorage.getItem("u53r")
}

export const LoginUser = async (user) => {
    if (window.localStorage.getItem("u53r")) {
        const data = await axios.post(`${BASE_URL}users/login`, null, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("u53r")}`
            }
        })
        return data
    }else{
        const data = await axios.post(`${BASE_URL}users/login`, user)
        return data
    }
}

export const CreateUser = async (user) => {
    const data = await axios.post(`${BASE_URL}users/createuser`, user)
    return data
}

export const CreateStore = async (storeInformation) => {
    const data = await axios.post(`${BASE_URL}stores/create`, storeInformation, headersConfig)
    return data
}



