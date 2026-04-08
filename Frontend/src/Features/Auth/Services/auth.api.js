import axios from "axios";

const api = axios.create({
    baseURL: "https://ai-battle-arena-pgv8.onrender.com",
    withCredentials: true
});

export const registerUser = async ({ username, email, password }) => {
    const response = await api.post("/api/auth/register", { username, email, password });
    return response.data;
};

export const loginUser = async ({ email, password }) => {
    const response = await api.post("/api/auth/login", { email, password });
    return response.data;
};

export const getUser = async () => {
    const response = await api.get("/api/auth/get-me");
    return response.data;
};

export const logoutUser = async () => {
    const response = await api.post("/api/auth/logout");
    return response.data;
};
