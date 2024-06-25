import api from "./api";

const apiTicket = {
    getList: (params) => api.get(`/tickets`, {
        params: {
            page: params.page,
            size: params.size,
            keyword: params.keyword,
            keywordField: params.keywordField,
        },
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`
        }
    }),
    update: (params) => api.put(`/tickets/${params.id}/cancel`, {}, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`
        }
    })
};

export default apiTicket;