import api from "./api";

const apiTimetable = {
    getList: (params) => api.get(`/timetables`, { params }),
    getDetail: (params) => api.get(`/timetables/${params.id}`),
    getListByIds: (params) => api.get(`/timetables/movies/${params.movieId}/cinemas/${params.cinemaId}/theaters/${params.theaterId}`),
};

export default apiTimetable;