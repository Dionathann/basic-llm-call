import { createCompletionStream, Message } from "@anvia/core";
import { OpenAIClient } from "@anvia/openai";
import { input } from "@inquirer/prompts";

const deepseek = new OpenAIClient({
    apiKey: process.env.MUX_API_KEY,
    baseUrl: "https://ai.devscale.id/api/v1",
});

const model = deepseek.completionModel("gpt-5.5");

const memoryMessage: Message[] = [];

async function main(){
    while (true) {
        const userInput = await input({
            message: "You: ",
        });

        if(userInput === "exit"){
            break;
        }

        memoryMessage.push(Message.user(userInput));

        const response = createCompletionStream(model, {
            instructions: "You are a helpful assistant.",
            input: userInput,
            messages: memoryMessage
        });

        let assistantResponse = ""
        
        console.log("Assistant: ");
        for await(const chunk of response){
            if(chunk.type === "text_delta"){
                process.stdout.write(chunk.delta);
                assistantResponse += chunk.delta
            }
        }
        console.log();
        memoryMessage.push(Message.assistant(assistantResponse));
    }
}

main()