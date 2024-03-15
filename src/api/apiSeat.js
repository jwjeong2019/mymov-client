import api from "./api";

const apiSeat = {
    getList: (params) => api.get(`/seats`, { params }),
    getDetail: (params) => api.get(`/seats/${params.id}`),
};

export default apiSeat;