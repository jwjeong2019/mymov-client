import api from "./api";

const apiTheater = {
    getList: (params) => api.get(`/theaters`, { params }),
    getDetail: (params) => api.get(`/theaters/${params.id}`),
    create: (params) => api.post(`/theaters`, {
        cinemaId: params.cinemaId,
        number: params.number,
    }, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`
        }
    }),
    delete: (params) => api.delete(`/theaters/${params.id}`, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`
        }
    }),
};

export default apiTheater;