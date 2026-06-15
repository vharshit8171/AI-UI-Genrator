import axios from "axios";
import useAuthStore from "../../store/AuthStore";

const api = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the user is not logged in so there is no point of trying to refresh token and this prevent us from infinite loop because /auth/me return 401 when there is no token or invalid token and the interceptor will try to refresh token and call /auth/me again and again until it get success.

        const authRoutes = [
            "/user/login",
            "/user/register",
            "/user/social-login",
            "/user/refresh-token",
        ];

        if (authRoutes.includes(originalRequest.url)) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await api.post("/user/refresh-token");
                return api(originalRequest);
            } catch (err) {
                console.log("ref-failed", err);
                useAuthStore.getState().reset();
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);
export default api;