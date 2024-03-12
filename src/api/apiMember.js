import api from "./api";

const apiMember = {
    createToken: (params) => api.post(`/members/token`, params),
};

export default apiMember;