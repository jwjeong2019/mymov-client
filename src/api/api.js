import axios from "axios";

const {
    REACT_APP_API_PROTOCOL,
    REACT_APP_API_HOST,
    REACT_APP_API_PORT
} = process.env;
const BASE_URL = `${REACT_APP_API_PROTOCOL}://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}/v1/api/dev`;

const api = axios.create({
    baseURL: BASE_URL
});

export default api;