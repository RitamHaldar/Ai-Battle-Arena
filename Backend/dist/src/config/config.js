import dotenv from "dotenv";
dotenv.config();
export const config = {
    COHERE_API_KEY: process.env.COHERE_API_KEY || "",
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
    GROQ_API_KEY: process.env.GROQ_API_KEY || "",
    MYSTRAL_API_KEY: process.env.MYSTRAL_API_KEY || "",
    JWT_SECRET: process.env.JWT_SECRET || "",
    MONGO_URI: process.env.MONGO_URI || ""
};
//# sourceMappingURL=config.js.map