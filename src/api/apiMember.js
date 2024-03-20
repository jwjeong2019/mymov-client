import api from "./api";

const apiMember = {
    createToken: (params) => api.post(`/members/token`, params),
    getDetail: (params) => api.get(`/members/${params.id}`, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`
        }
    }),
    createMember: (params) => api.post(`/members`, params),
    updateMember: (params) => api.put(`/members`, {
        memberId: params.memberId,
        memberPw: params.memberPw,
        name: params.name,
        email: params.email,
        phone: params.phone,
        address: params.address,
    }, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`
        }
    }),
    createTicket: (params) => api.post(`/members/tickets`, {
        timetableId: params.timetableId,
        seatId: params.seatId,
        price: params.price,
    }, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`
        }
    }),
};

export default apiMember;