import api from "./api";

const apiMovie = {
    getList: (params) => api.get(`/movies`, { params }),
    getDetail: (params) => api.get(`/movies/${params.id}`),
};

export default apiMovie;