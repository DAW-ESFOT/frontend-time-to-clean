import api from "./api";

async function getComplaint(id) {
    return await api.get(`/complaints/${id}`)
}

async function sendComplaint(data) {
    return await api.post(`/complaints`, data)
}

export const Complaint = {
    getComplaint,
    sendComplaint,
}