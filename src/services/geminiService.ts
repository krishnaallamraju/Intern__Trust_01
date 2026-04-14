import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function analyzeInternshipOffer(offerText: string): Promise<AnalysisResult> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        text: `Analyze the following text. 
        
        Step 1: Determine if the text is related to an internship offer, job application, or recruitment message. If it is NOT related to these topics (e.g., random chat, general knowledge questions, unrelated spam), set "is_valid" to false.
        
        Step 2: If "is_valid" is true, identify potential "Fake Internship" red flags based on:
        1. Domain Check: Does the email come from a public domain (gmail.com, outlook.com) rather than a corporate one?
        2. Urgency & Pressure: Are they asking for immediate payment, security deposits, or "equipment fees"?
        3. Vague Details: Is the job description overly generic or missing a specific company address?
        4. Unprofessionalism: Check for poor grammar, excessive emojis, or suspicious links.
        
        Offer Text:
        ${offerText}
        `
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          is_valid: {
            type: Type.BOOLEAN,
            description: "True if the input is related to an internship or job offer, false otherwise.",
          },
          risk_score: {
            type: Type.NUMBER,
            description: "A score from 0 to 100 indicating the risk level. Set to 0 if is_valid is false.",
          },
          red_flags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of specific red flags found. Empty if is_valid is false.",
          },
          verdict: {
            type: Type.STRING,
            enum: ["Safe", "Suspicious", "High Risk"],
            description: "The overall verdict. Use 'Safe' as default if is_valid is false.",
          },
          explanation: {
            type: Type.STRING,
            description: "A brief explanation. If is_valid is false, explain that the input is not a recognized internship offer.",
          },
        },
        required: ["is_valid", "risk_score", "red_flags", "verdict", "explanation"],
      },
    },
  });

  if (!response.text) {
    throw new Error("Failed to get analysis from Gemini");
  }

  return JSON.parse(response.text.trim());
}
