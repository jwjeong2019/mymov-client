import api from "./api";

const apiCinema = {
    getList: () => api.get(`/cinemas`),
    getDetail: (params) => api.get(`/cinemas/${params.id}`),
};

export default apiCinema;