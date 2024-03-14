import api from "./api";

const apiTheater = {
    getList: (params) => api.get(`/theaters`, { params }),
    getDetail: (params) => api.get(`/theaters/${params.id}`),
};

export default apiTheater;