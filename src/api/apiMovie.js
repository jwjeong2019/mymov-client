import api from "./api";

const apiMovie = {
    getList: (params) => api.get(`/movies`, { params }),
    getDetail: (params) => api.get(`/movies/${params.id}`),
    getReviewList: (params) => api.get(`/movies/${params.id}/reviews`, {
        params: {
            page: params.page,
            size: params.size,
        }
    }),
    create: (params) => api.post(`/movies`, params.formData, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`,
            "Content-Type": "multipart/form-data"
        }
    }),
    update: (params) => api.put(`/movies/${params.id}`, params.formData, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`,
            "Content-Type": "multipart/form-data"
        }
    }),
    delete: (params) => api.delete(`/movies/${params.id}`, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`
        }
    }),
};

export default apiMovie;