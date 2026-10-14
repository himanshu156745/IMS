import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1",
    withCredentials: true, // Always include cookies
});

const getCsrfFromCookie = () => {
    const match = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
};

// Request interceptor to attach CSRF token
axiosInstance.interceptors.request.use(
    async (config) => {
        const method = config.method?.toLowerCase();
        if (['post', 'put', 'patch', 'delete'].includes(method)) {
            let token = getCsrfFromCookie();

            // If mutating request and no CSRF cookie exists, fetch token proactively
            if (!token && !config.url?.includes('/csrf-token')) {
                try {
                    const apiBase = config.baseURL || (import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1");
                    const res = await axios.get(`${apiBase}/csrf-token`, { withCredentials: true });
                    token = res.data?.csrfToken || getCsrfFromCookie();
                } catch {
                    token = getCsrfFromCookie();
                }
            }

            if (token) {
                config.headers['X-CSRF-Token'] = token;
                config.headers['X-XSRF-TOKEN'] = token;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle 401 Unauthorized and automatic CSRF retry
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Auto-retry once on 403 CSRF failure
        if (
            error.response &&
            error.response.status === 403 &&
            error.response.data?.message?.toLowerCase().includes('csrf') &&
            originalRequest &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                const apiBase = originalRequest.baseURL || (import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1");
                const res = await axios.get(`${apiBase}/csrf-token`, { withCredentials: true });
                const newToken = res.data?.csrfToken || getCsrfFromCookie();
                if (newToken) {
                    originalRequest.headers['X-CSRF-Token'] = newToken;
                    originalRequest.headers['X-XSRF-TOKEN'] = newToken;
                    return axiosInstance(originalRequest);
                }
            } catch (csrfErr) {
                return Promise.reject(csrfErr);
            }
        }

        // Auto-refresh token rotation on 401 Unauthorized
        if (
            error.response &&
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            !originalRequest.url?.includes('/users/login') &&
            !originalRequest.url?.includes('/users/refresh-token') &&
            !originalRequest.url?.includes('/users/refresh')
        ) {
            originalRequest._retry = true;
            try {
                const apiBase = originalRequest.baseURL || (import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1");
                await axios.post(`${apiBase}/users/refresh-token`, {}, { withCredentials: true });
                return axiosInstance(originalRequest);
            } catch (refreshErr) {
                window.dispatchEvent(new Event('unauthorized'));
                return Promise.reject(refreshErr);
            }
        }

        if (error.response && error.response.status === 401) {
            window.dispatchEvent(new Event('unauthorized'));
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
