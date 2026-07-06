import { OpenAIClient } from "@anvia/openai";
import { createCompletion } from "@anvia/core";

const deepseek = new OpenAIClient({
    apiKey: process.env.MUX_API_KEY,
    baseUrl: "https://ai.devscale.id/api/v1",
});

const model = deepseek.completionModel("gpt-5.5");

const response = await createCompletion(model, {
    input: "Do You Know About Bocchi the Rock? Can you tell me about it?",
});

console.log(response.text);