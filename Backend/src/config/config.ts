import dotenv from "dotenv";
dotenv.config();

type config = {
    COHERE_API_KEY: string,
    GEMINI_API_KEY: string,
    GROQ_API_KEY: string,
    MYSTRAL_API_KEY: string
}

export const config: config = {
    COHERE_API_KEY: process.env.COHERE_API_KEY || "",
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
    GROQ_API_KEY: process.env.GROQ_API_KEY || "",
    MYSTRAL_API_KEY: process.env.MYSTRAL_API_KEY || ""
}