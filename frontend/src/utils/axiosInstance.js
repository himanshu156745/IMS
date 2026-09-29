import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1",
    withCredentials: true, // Important for cookies
});

// Request interceptor to set CSRF token
axiosInstance.interceptors.request.use(
    (config) => {
        if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase())) {
            const match = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
            if (match) {
                config.headers['X-CSRF-Token'] = decodeURIComponent(match[2]);
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle 401 Unauthorized
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle token expiration/unauthorized access
            // Maybe redirect to login or clear user state
            // It's best handled in AuthContext, but we can emit a custom event or let AuthContext catch it
            window.dispatchEvent(new Event('unauthorized'));
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
