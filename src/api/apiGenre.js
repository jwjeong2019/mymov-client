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
};

export default apiGenre;