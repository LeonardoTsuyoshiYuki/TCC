import axios from 'axios'

const api = axios.create({baseURL: 'http://localhost:3001/TCC'})

export default api