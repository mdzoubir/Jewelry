import axios from 'axios';

// Create a configured axios instance
// We assume the backend is running on localhost:3000
// In production, this URL should be an environment variable
const client = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optional: Add request interceptor to attach token if it exists
client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // or 'authToken', depending on your auth logic
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default client;
