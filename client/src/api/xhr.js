import axios from 'axios';

import errorHandler from './errorHandler';
import { fetchToken } from './tokenHandler';

const instance = axios.create();
instance.defaults.baseURL = process.env.REACT_APP_BASE_URL;
instance.defaults.withCredentials = true;
instance.defaults.timeout = 5000;

// Request interceptor
instance.interceptors.request.use(config => {
    const token = fetchToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}, err => {
    return Promise.reject(err);
});

// Response interceptor
instance.interceptors.response.use(response => {
    return response.data;
}, err => {
    const errorData = err.response?.data;
    return errorData ? errorHandler(errorData) : Promise.reject(err);
});

export default instance;
