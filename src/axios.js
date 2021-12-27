import axios from 'axios';

const $axios = axios.create({
    baseURL: 'http://localhost:8000/api',
});

$axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') || '';
    config.headers = {
        Authorization: `JWT ${token}`,
    };
    return config;
});

export default $axios;
