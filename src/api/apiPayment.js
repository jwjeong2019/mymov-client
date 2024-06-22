import api from "./api";

const apiPayment = {
    complete: (params) => api.post(`/payments/complete`, {
        paymentId: params.paymentId,
        timetableId: params.timetableId,
        seatId: params.seatId,
        price: params.price,
    }, {
        headers: {
            Authorization: `${params.grantType} ${params.accessToken}`
        }
    })
};

export default apiPayment;