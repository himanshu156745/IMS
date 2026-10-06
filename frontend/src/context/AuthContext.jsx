import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { AuthContext } from '../hooks/useAuth';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const { data } = await axiosInstance.get('/users/me');
            setUser(data.data.user);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();

        const handleUnauthorized = () => {
            setUser(null);
        };

        window.addEventListener('unauthorized', handleUnauthorized);
        return () => window.removeEventListener('unauthorized', handleUnauthorized);
    }, []);

    const login = async (email, password) => {
        const { data } = await axiosInstance.post('/users/login', { email, password });
        setUser(data.data.user);
        return data.data;
    };

    const logout = async () => {
        await axiosInstance.post('/users/logout');
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        logout,
        checkAuth,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
