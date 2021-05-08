import Axios from "axios"

export const getAxiosInstanceJsonServer = () => {
    return Axios.create({
        baseURL: "http://localhost:3010",
        headers: {
            API_KEY: "15bchty5y832hjHJ8"
        }
    })
};
export const getAxiosInstanceAuth = () => {
    return Axios.create({
        baseURL: "https://twitterapi.liara.run/api/",
        headers: {
        }
    })
};
export const getAxiosInstanceApi = () => {
    return Axios.create({
        baseURL: "https://twitterapi.liara.run/api/",
        headers: {
            'x-auth-token' : localStorage.getItem("x-auth-token")
        }
    })
};
