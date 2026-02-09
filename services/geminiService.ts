
import { GoogleGenAI } from "@google/genai";

export const getGeminiResponse = async (prompt: string, context?: string) => {
  if (!process.env.API_KEY) throw new Error("API Key missing");
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `${context ? `Context: ${context}\n\n` : ''}Prompt: ${prompt}`,
    config: {
      systemInstruction: "You are NJADI AI, a luxurious assistant. Your tone is sophisticated, professional, and slightly mysterious, like a wolf. Provide short, smart replies.",
      temperature: 0.7,
    },
  });

  return response.text;
};

export const summarizeMessages = async (messages: string[]) => {
  if (!process.env.API_KEY) return "Login to summarize";
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Summarize these messages in a luxurious tone: ${messages.join(' | ')}`,
  });

  return response.text;
};

