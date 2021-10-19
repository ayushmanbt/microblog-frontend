import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://mblog-abt.herokuapp.com/"
})

export default axiosClient