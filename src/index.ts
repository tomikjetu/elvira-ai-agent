import dotenv from 'dotenv';
import { OpenAIClient } from './openaiClient';
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if(!OPENAI_API_KEY) throw new Error("Missing OpenAI API key");

const client = new OpenAIClient(OPENAI_API_KEY, null);
client.chat(null, "Hello, can you help me with my library entries?");