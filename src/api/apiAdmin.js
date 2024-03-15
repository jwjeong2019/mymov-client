import api from "./api";

const apiAdmin = {
    createToken: (params) => api.post(`/admins/token`, params),
    getMyInfo: (params) => api.get(`/admins/info`, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`
        }
    }),
    createMovie: (params) => api.post(`/admins/movies`, params.formData, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`,
            "Content-Type": "multipart/form-data"
        }
    }),
    updateMovie: (params) => api.put(`/admins/movies/${params.id}`, params.formData, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`,
            "Content-Type": "multipart/form-data"
        }
    }),
    deleteMovie: (params) => api.delete(`/admins/movies/${params.id}`, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`,
        }
    }),
    createCinema: (params) => api.post(`/admins/cinemas`, {
        name: params.name,
        region: params.region,
    }, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`,
        }
    }),
    deleteCinema: (params) => api.delete(`/admins/cinemas/${params.id}`, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`,
        }
    }),
    createTheater: (params) => api.post(`/admins/theaters`, {
        cinemaId: params.cinemaId,
        number: params.number,
    }, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`,
        }
    }),
    deleteTheater: (params) => api.delete(`/admins/theaters/${params.id}`, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`,
        }
    }),
    createSeat: (params) => api.post(`/admins/seats`, {
        theaterId: params.theaterId,
        seats: params.seats,
    }, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`,
        }
    })
};

export default apiAdmin;