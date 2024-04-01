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
    deleteMember: (params) => api.delete(`/members`, {
        data: {
            detail: `유형: ${params.reasonType}\n내용: ${params.reasonDetail}`
        },
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
    getReservationList: (params) => api.get(`/members/reservations`, {
        params: {
            page: params.page,
            size: params.size,
            keyword: params.keyword,
            keywordField: params.keywordField,
            sortField: params.sortField,
            sortType: params.sortType,
        },
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`
        }
    }),
    deleteReservation: (params) => api.delete(`/members/reservations`, {
        data: {
            id: params.id,
        },
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`
        }
    }),
    getMemberId: (params) => api.get(`/members/memberId/${params.memberId}`),
};

export default apiMember;