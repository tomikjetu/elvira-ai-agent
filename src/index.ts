import dotenv from 'dotenv';
import { startServer } from './server';
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) throw new Error("Missing OpenAI API key");

startServer();