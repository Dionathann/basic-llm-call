import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const response = await client.chat.completions.parse({
    model: "gpt-5.5",
    messages: [{
        role: "user",
        content: "Hello"
    }]
})

const result = response.choices[0]?.message.content;

console.log(result);
