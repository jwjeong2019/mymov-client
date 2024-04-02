import api from "./api";

const apiCertification = {
    requestCertificationByPhone: (params) => api.post(`/certifications/code/phone`, params),
    requestCertificationByEmail: (params) => api.post(`/certifications/code/email`, params),
    confirmCertificationByPhone: (params) => api.get(`/certifications/${params.code}/phone`, {
        params: {
            purpose: params.purpose,
        }
    }),
    confirmCertificationByEmail: (params) => api.get(`/certifications/${params.code}/email`, {
        params: {
            purpose: params.purpose,
        }
    }),
};

export default apiCertification;