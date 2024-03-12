import api from "./api";

const apiAdmin = {
    createToken: (params) => api.post(`/admins/token`, params),
};

export default apiAdmin;