import axios from "axios";

// we have to set the base url for the backend
const api = axios.create({
    baseURL: "http://localhost:5004/api/",
})

export default api;