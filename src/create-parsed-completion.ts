import { z } from "zod";
import { createParsedCompletion } from "@anvia/core";
import { OpenAIClient } from "@anvia/openai";

const deepseek = new OpenAIClient({
    apiKey: process.env.MUX_API_KEY, 
    baseUrl: "https://ai.devscale.id/api/v1",
});

const model = deepseek.completionModel("gpt-5.5");

const animeDataSchema = z.object({
    animeName: z.string(),
    animeDescription: z.string(),
    animeCategory: z.string(),
});

const response = await createParsedCompletion(model, {
    instructions: "Parse Response Into Anime Data Schema",
    input: "Create anime data for 'Bocchi the Rock!', a slice-of-life comedy about a socially anxious high school girl who joins an indie rock band to overcome her isolation.",
    schema: animeDataSchema,
});

console.log(response.data);