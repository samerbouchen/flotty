import axios from "./axios";


export const  getUsers = async () => {
    return axios.get('/users');
}

export const  deleteUser = async (id) => {
    return axios.delete(`/user/${id}`);
}

export const addUser = async (data) => {
    return axios.post('/register',data)
}

export const blockUser = async (block = true, userId) => {
    return axios.patch(`/block-user/${userId}`,{
        blocked: block,
        id: userId
    })
}

export const reclamation = async (reclamation, id) => {
    return axios.post('/reclamation',{reclamation, id})
}

export const getReclamations = async () => {
    return axios.get('/reclamations');
}

export const getAffectations = async () => {
    return axios.get('/affectations');
}

export const addalert = async (data) => {
    return axios.post('/alert',data)
}

export const getAlert = async (id) => {
    return axios.get(`/alert/${id}`);
}