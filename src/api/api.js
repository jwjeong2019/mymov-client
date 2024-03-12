import axios from "axios";

const BASE_URL_LOCAL_DEV = 'http://localhost:8080/v1/api/dev';

const api = axios.create({
    baseURL: BASE_URL_LOCAL_DEV
});

export default api;