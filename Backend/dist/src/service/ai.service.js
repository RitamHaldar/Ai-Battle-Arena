import { ChatMistralAI } from "@langchain/mistralai";
import { config } from "../config/config.js";
import { ChatGroq } from "@langchain/groq";
import { ChatGoogle } from "@langchain/google";
import { CohereClientV2 } from "cohere-ai";
export const mystralModel = new ChatMistralAI({
    apiKey: config.MYSTRAL_API_KEY,
    model: "mistral-medium-latest"
});
export const groqModel = new ChatGroq({
    apiKey: config.GROQ_API_KEY,
    model: "openai/gpt-oss-120b"
});
export const geminiModel = new ChatGoogle({
    apiKey: config.GEMINI_API_KEY,
    model: "gemini-flash-latest"
});
const cohere = new CohereClientV2({
    token: config.COHERE_API_KEY,
});
export const cohereModel = {
    invoke: async function generateSolution(problem) {
        const response = await cohere.chat({
            model: "command-a-reasoning-08-2025",
            messages: [{ role: "user", content: problem }],
        });
        return {
            text: response.message.content?.map((item) => {
                if (item.type === "text") {
                    return item.text;
                }
            }).join("")
        };
    }
};
//# sourceMappingURL=ai.service.js.map