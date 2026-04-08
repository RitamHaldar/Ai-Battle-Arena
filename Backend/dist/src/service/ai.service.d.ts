import { ChatMistralAI } from "@langchain/mistralai";
import { ChatGroq } from "@langchain/groq";
import { ChatGoogle } from "@langchain/google";
export declare const mystralModel: ChatMistralAI<import("@langchain/mistralai").ChatMistralAICallOptions>;
export declare const groqModel: ChatGroq;
export declare const geminiModel: ChatGoogle;
export declare const cohereModel: {
    invoke: (problem: string) => Promise<{
        text: string | undefined;
    }>;
};
//# sourceMappingURL=ai.service.d.ts.map