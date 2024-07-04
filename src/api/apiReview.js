import api from "./api";

const apiReview = {
    create: (params) => api.post(`/reviews`, {
        movieId: params.movieId,
        score: params.score,
    }, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`
        }
    })
};

export default apiReview;