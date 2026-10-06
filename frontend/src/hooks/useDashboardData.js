import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { unwrapList } from '../utils/api';

export function useDashboardData() {
  const [data, setData] = useState({
    user: null,
    profile: null,
    applications: [],
    notifications: [],
    certificates: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Perform parallel requests
      const [
        userRes,
        profileRes,
        applicationsRes,
        notificationsRes,
        certificatesRes
      ] = await Promise.allSettled([
        axiosInstance.get('/users/me'),
        axiosInstance.get('/student-profiles/me'),
        axiosInstance.get('/applications/me?limit=20'),
        axiosInstance.get('/notifications?limit=5'),
        axiosInstance.get('/certificates/me?limit=5')
      ]);

      // Check if critical request (user) failed
      if (userRes.status === 'rejected') {
        throw userRes.reason;
      }

      setData({
        user: userRes.value?.data?.data || null,
        profile: profileRes.status === 'fulfilled' ? (profileRes.value?.data?.data || null) : null,
        applications: applicationsRes.status === 'fulfilled' ? unwrapList(applicationsRes.value) : [],
        notifications: notificationsRes.status === 'fulfilled' ? unwrapList(notificationsRes.value) : [],
        certificates: certificatesRes.status === 'fulfilled' ? unwrapList(certificatesRes.value) : [],
      });
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...data, loading, error, refetch: fetchData };
}
