import axios from "axios"
const BASE_URL = "http://localhost:3002/api/"
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



