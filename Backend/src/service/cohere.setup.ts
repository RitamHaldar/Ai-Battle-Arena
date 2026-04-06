import { CohereClientV2 } from "cohere-ai";
import { config } from "../config/config.js";

const cohereModel = new CohereClientV2({
    token: config.COHERE_API_KEY,

});

export default {
    invoke: async function generateSolution(problem: string) {
        const response = await cohereModel.chat({
            model: "command-a-reasoning-08-2025",
            messages: [{ role: "user", content: problem }],
        });
        return {
            text: response.message.content?.map((item) => {
                if (item.type === "text") {
                    return item.text
                }
            }).join("")
        }
    }
}