import axios from "axios";

const api = axios.create({
    baseURL: "https://ai-battle-arena-pgv8.onrender.com",
    withCredentials: true
});

export const getResponse = async (problem, modelnos, model1, model2, model3) => {
    const response = await api.post("/api/chat", {
        problem,
        modelnos,
        model1,
        model2,
        model3
    });
    return response.data;
};