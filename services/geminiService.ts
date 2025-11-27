import { GoogleGenAI } from "@google/genai";
import { SearchResponse } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const performSearch = async (query: string): Promise<SearchResponse> => {
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
        // responseMimeType and responseSchema are NOT allowed with googleSearch
      },
    });

    const candidate = response.candidates?.[0];
    const text = response.text || "No results found.";
    const groundingMetadata = candidate?.groundingMetadata;

    return {
      text,
      groundingMetadata: groundingMetadata as any, // Cast to match our simplified type if needed
    };
  } catch (error) {
    console.error("Search failed:", error);
    throw error;
  }
};
