import api from "./api";

const apiMovie = {
    getList: (params) => api.get(`/movies`, { params }),
    getDetail: (params) => api.get(`/movies/${params.id}`),
    getReviewList: (params) => api.get(`/movies/${params.id}/reviews`, {
        params: {
            page: params.page,
            size: params.size,
        }
    })
};

export default apiMovie;