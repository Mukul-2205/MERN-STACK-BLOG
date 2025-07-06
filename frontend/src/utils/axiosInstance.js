// src/utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://mern-stack-blog-mbxc.onrender.com/api/v1",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data.message === "jwt expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          "https://mern-stack-blog-mbxc.onrender.com/api/v1/user/refresh-token",
          {},
          { withCredentials: true }
        );

        console.log("✅ Token refreshed", refreshResponse.data);

        // Retry original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("❌ Refresh failed", refreshError);
        window.location.href = "/login"; // or redirect
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
