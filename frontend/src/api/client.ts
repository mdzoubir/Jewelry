import axios from 'axios';

// Use environment variable or fallback to localhost
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const client = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Helper to verify token and get user
export const getCurrentUser = async (token: string) => {
    const response = await client.get('/users/me', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export default client;
