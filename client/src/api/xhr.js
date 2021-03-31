import axios from 'axios';
import errorHandler from './errorHandler';
import { fetchToken } from './tokenHandler';

const instance = axios.create();
const token = fetchToken();

// Request interceptor
instance.interceptors.request.use(config => {
    // access token from the session storage
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}, err => {
    return Promise.reject(err);
});

// Response interceptor
instance.interceptors.response.use(response => {
    // if (response.data && response.data.accessToken) {
        // const { accessToken } = response.data;
        // instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    // }
    return response.data;
}, err => {
    if (err.response && err.response.data) {
        return errorHandler(err.response.data);
    }
    return Promise.reject(err);
});

export default instance;