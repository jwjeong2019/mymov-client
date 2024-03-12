import api from "./api";

const apiMovie = {
    getList: (params) => api.get(`/movies`, { params }),
};

export default apiMovie;