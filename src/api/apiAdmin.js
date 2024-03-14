import api from "./api";

const apiAdmin = {
    createToken: (params) => api.post(`/admins/token`, params),
    getMyInfo: (params) => api.get(`/admins/info`, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`
        }
    }),
    createMovie: (params) => api.post(`/admins/movies`, params.formData, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`,
            "Content-Type": "multipart/form-data"
        }
    }),
    updateMovie: (params) => api.put(`/admins/movies/${params.id}`, params.formData, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`,
            "Content-Type": "multipart/form-data"
        }
    }),
    deleteMovie: (params) => api.delete(`/admins/movies/${params.id}`, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`,
        }
    }),
};

export default apiAdmin;