import api from "./api";

const apiToken = {
    refresh: refreshToken => api.post(`token/reissue/access`, {}, {
        headers: {
            Authorization: `Bearer ${refreshToken}`
        }
    })
};

export default apiToken;