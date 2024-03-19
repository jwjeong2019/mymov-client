import api from "./api";

const apiMember = {
    createToken: (params) => api.post(`/members/token`, params),
    getMyInfo: (params) => api.get(`/members/info`, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`
        }
    }),
    createMember: (params) => api.post(`/members`, params),
};

export default apiMember;