import { ChatMistralAI } from "@langchain/mistralai";
import { config } from "../config/config.js";
import { ChatGroq } from "@langchain/groq";
import { ChatGoogle } from "@langchain/google"

export const mystralModel = new ChatMistralAI({
    apiKey: config.MYSTRAL_API_KEY,
    model: "mistral-medium-latest"
})

export const groqModel = new ChatGroq({
    apiKey: config.GROQ_API_KEY,
    model: "openai/gpt-oss-120b"
})

export const geminiModel = new ChatGoogle({
    apiKey: config.GEMINI_API_KEY,
    model: "gemini-2.5-flash"
})