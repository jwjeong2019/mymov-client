import api from "./api";

const apiGenre = {
    getList: (params) => api.get(`/genres`, {
        params: {
            page: params.page,
            size: params.size,
            keyword: params.keyword,
            keywordField: params.keywordField,
            sortField: params.sortField,
            sortType: params.sortType,
        }
    }),
    create: (params) => api.post(`/genres`, {
        name: params.name,
    }, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`
        }
    }),
    delete: (params) => api.delete(`/genres`, {
        data: {
            id: params.id,
        },
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`
        }
    }),
};

export default apiGenre;