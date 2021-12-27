import axios from 'axios';

const $axios = axios.create({
    baseURL: 'http://localhost:8000/api',
});

$axios.interceptors.request.use((config) => {
    config.headers = {
        Authorization:
            'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0IiwiaWF0IjoxNjQwNTg2OTY5LCJleHAiOjE2NDA2NzMzNjl9.hh3UiR9HzM7zDQpVVRHdmcz6MAxGkY7oAGQE3dNoKVw',
    };
    return config;
});

export default $axios;
