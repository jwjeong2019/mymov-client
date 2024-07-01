import api from "./api";

const apiCinema = {
    getList: () => api.get(`/cinemas`),
    getDetail: (params) => api.get(`/cinemas/${params.id}`),
    create: (params) => api.post(`/cinemas`, {
        name: params.name,
        region: params.region,
    }, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`
        }
    }),
    delete: (params) => api.delete(`/cinemas/${params.id}`, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`
        }
    }),
};

export default apiCinema;