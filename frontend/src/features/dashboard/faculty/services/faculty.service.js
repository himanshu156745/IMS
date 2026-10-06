import api from "../../../../utils/axiosInstance";
import { unwrapList } from '../../../../utils/api';

export const facultyService = {
  getProfile: async () => {
    const response = await api.get("/faculty/me");
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await api.patch("/faculty/me", data);
    return response.data;
  },

  getDashboardStats: async () => {
    const response = await api.get("/faculty/dashboard-stats");
    return response.data;
  },

  getMyStudents: async () => {
    const response = await api.get("/faculty/students");
    return unwrapList(response);
  }
};
