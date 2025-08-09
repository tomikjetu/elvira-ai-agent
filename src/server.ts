import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { OpenAIClient } from './openAIClient/openaiClient';

const app = express();
app.use(express.json());

// In-memory chat session store
const chatSessions: Record<string, OpenAIClient> = {};
const messagesQueue: Record<string, {
    type: 'message' | 'books',
    content: string | string[]
}[]> = {};

function getMessagesFromQueue(chatId: string) {
    const messages = messagesQueue[chatId] || [];
    const result = [...messages];
    messagesQueue[chatId] = [];
    return result;
}

app.post('/api/startchat', (req, res) => {
    const chatId = uuidv4();
    const { entryId } = req.body;
    messagesQueue[chatId] = [];
    chatSessions[chatId] = new OpenAIClient(entryId, {
        messageListener: (message) => {
            messagesQueue[chatId].push({ type: 'message', content: message });
        },
        displayBooksListener: (bookIds) => {
            messagesQueue[chatId].push({ type: 'books', content: bookIds });
        }
    })
    res.json({ chatId });
});

// POST /api/sendchat - send a message to the chat
app.post('/api/sendchat', async (req, res) => {
    const { chatId, message, entryId } = req.body;

    if (!chatId || !message || !entryId) {
        return res.status(400).json({ error: 'chatId, message, and entryId are required' });
    }

    const chatSession = chatSessions[chatId];
    if (!chatSession) {
        return res.status(404).json({ error: 'Chat session not found' });
    }

    await chatSession.chat(message);
    const messages = getMessagesFromQueue(chatId);

    res.json({ success: true, messages });
});

export function startServer(){
    const PORT = process.env.PORT || 6045;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
