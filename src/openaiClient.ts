import OpenAI from 'openai';
import { ResponseInput, ResponseInputItem } from 'openai/resources/responses/responses';
import { getTools } from './tools';

export class OpenAIClient {
    private openai: OpenAI;
    private chatHistory: ResponseInput;

    constructor(apiKey: string, entryId: string | null) {
        this.openai = new OpenAI({ apiKey });
        this.chatHistory = [
            this.getSystemPrompt(entryId)
        ]
    }

    getSystemPrompt(entryId: string | null): ResponseInputItem {
        return {
            role: "developer",
            content: [
                {
                    type: "input_text",
                    text: `You are a helpful library bot, help the user navigate within entries and provide summary, recommendations using api functions

                            Entry id: ${entryId}
                            If entry id is specified, you must talk about the current entry set, unless dismissed by the user.

                            use displayBook function to show books to the user, if necessary send accompanied message`
                }
            ]
        }
    }


    async chat(entryId: string | null, message: string) {
        this.chatHistory[0] = this.getSystemPrompt(entryId)
        this.chatHistory.push({
            role: "user",
            content: [
                {
                    type: "input_text",
                    text: message
                }
            ]
        });

        const response = await this.openai.responses.create({
            model: 'gpt-5',
            input: this.chatHistory,
            text: {
                "format": {
                    "type": "text"
                },
                "verbosity": "low"
            },
            reasoning: {
                "effort": "medium"
            },
            tools: getTools()
        });

        const items: ResponseInputItem[] = response.output;
        
        console.log(items);

    }

}
