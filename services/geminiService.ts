import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  try {
    const modelId = 'gemini-3-flash-preview';

    // Construct the chat history for context, though for simple stateless calls we can just use generateContent.
    // However, to keep context we should ideally use chat.
    // For this implementation, we will use a fresh chat session initialized with system instructions for simplicity,
    // or pass history if the API allows easy stateless history injection (ChatSession).
    
    // Let's use the chat API for better conversational flow
    const chat = ai.chats.create({
      model: modelId,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history // Injecting previous context
    });

    const result: GenerateContentResponse = await chat.sendMessage({
      message: message
    });

    return result.text || "I'm pondering that, but have no words right now.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I seem to be having trouble connecting to my creative network. Please try again later.";
  }
};