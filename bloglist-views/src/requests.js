import axios from 'axios'

const baseUrl = '/api/users'

export const getAllUsers = () => axios.get(baseUrl).then(res => res.data )