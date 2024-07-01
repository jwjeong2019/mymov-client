import api from "./api";

const apiTimetable = {
    getList: (params) => api.get(`/timetables`, { params }),
    getDetail: (params) => api.get(`/timetables/${params.id}`),
    getListByIds: (params) => api.get(`/timetables/movies/${params.movieId}/cinemas/${params.cinemaId}/theaters/${params.theaterId}`),
    create: (params) => api.post(`/timetables`, {
        cinemaId: params.cinemaId,
        theaterId: params.theaterId,
        movieId: params.movieId,
        startDate: params.startDate,
        endDate: params.endDate,
        startTime: params.startTime,
        endTime: params.endTime,
    }, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`
        }
    }),
    delete: (params) => api.delete(`/timetables/${params.id}`, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`
        }
    }),
};

export default apiTimetable;