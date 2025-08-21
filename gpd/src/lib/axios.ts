import axios from 'axios'
import { API_BASE_URL } from '../api/config/api'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  maxBodyLength: Infinity,
})

export default axiosInstance