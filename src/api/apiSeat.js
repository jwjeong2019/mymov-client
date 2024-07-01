import api from "./api";

const apiSeat = {
    getList: (params) => api.get(`/seats`, { params }),
    getDetail: (params) => api.get(`/seats/${params.id}`),
    create: (params) => api.post(`/seats`, {
        theaterId: params.theaterId,
        seats: params.seats,
    }, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`
        }
    }),
    delete: (params) => api.delete(`/seats`, {
        data: {
            seatIds: params.seatIds,
        },
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`
        }
    }),
};

export default apiSeat;