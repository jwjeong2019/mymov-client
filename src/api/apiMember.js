import api from "./api";

const apiMember = {
    createToken: (params) => api.post(`/members/token`, params),
    getMyInfo: (params) => api.get(`/members/info`, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`
        }
    }),
    createMember: (params) => api.post(`/members`, params),
    createTicket: (params) => api.post(`/members/tickets`, {
        timetableId: params.timetableId,
        seatId: params.seatId,
        price: params.price,
    }, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`
        }
    })
};

export default apiMember;