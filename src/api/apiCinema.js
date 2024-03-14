import api from "./api";

const apiMovie = {
    getList: () => api.get(`/cinemas`),
    getDetail: (params) => api.get(`/cinemas/${params.id}`),
};

export default apiMovie;