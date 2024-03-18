import api from "./api";

const apiTimetable = {
    getList: (params) => api.get(`/timetables`, { params }),
    getDetail: (params) => api.get(`/timetables/${params.id}`),
};

export default apiTimetable;