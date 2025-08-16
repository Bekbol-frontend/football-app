import axios from "axios";
import {
  LOCAL_STORAGE_ACCESS_TOKEN,
  LOCAL_STORAGE_REFRESH_TOKEN,
  LOCAL_STORAGE_USER,
} from "../consts/localStorage";

export const baseURL = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);

    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN);

        const response = await axios.post(
          "https://api.kkfa.uz/api/v1/admin/auth/refresh",
          undefined,
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const { access_token, refresh_token: newRefreshToken } = response.data;

        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, access_token);
        localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, newRefreshToken);

        API.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

        return API(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE_USER);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default API;
