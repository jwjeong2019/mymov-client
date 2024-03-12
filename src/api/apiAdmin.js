import api from "./api";

const apiAdmin = {
    createToken: (params) => api.post(`/admins/token`, params),
    getMyInfo: (params) => api.get(`/admins/info`, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`
        }
    }),
};

export default apiAdmin;