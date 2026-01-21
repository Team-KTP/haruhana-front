import { GoogleGenAI, Type } from "@google/genai";
import { Difficulty, Problem } from "../types";

// Helper to get today's date string YYYY-MM-DD
const getTodayString = () => new Date().toISOString().split('T')[0];

export const generateDailyProblem = async (
  topicName: string,
  difficulty: Difficulty
): Promise<Omit<Problem, 'id' | 'problemAt'>> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // We use gemini-3-flash-preview for speed and efficiency for text tasks
    const model = 'gemini-3-flash-preview';

    const prompt = `
      Create a technical interview question or learning problem about the topic "${topicName}".
      Difficulty level: ${difficulty}.
      
      The problem should be conceptual or a small code scenario.
      Focus on key understanding.
      
      **IMPORTANT**: Please output the 'title', 'description', and 'aiAnswer' in **Korean** (한국어).
      However, keep technical terms in English if they are commonly used in the industry (e.g., Garbage Collection, Virtual DOM).

      Return a JSON object with:
      - title: A short, catchy title in Korean.
      - description: The full problem statement in Korean (Markdown supported). 
      - aiAnswer: A concise model answer or key points explaining the solution in Korean (Markdown supported).
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            aiAnswer: { type: Type.STRING },
          },
          required: ["title", "description", "aiAnswer"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const json = JSON.parse(text);

    return {
      title: json.title,
      description: json.description,
      aiAnswer: json.aiAnswer,
      topic: topicName,
      difficulty: difficulty
    };

  } catch (error) {
    console.error("AI Generation Failed, using backup", error);
    // Fallback logic
    return {
      title: `${topicName} 기초 개념 (백업)`,
      description: `${topicName}의 핵심 개념과 소프트웨어 개발에서 중요한 이유를 설명하세요. 간단한 예시를 들어보세요.`,
      aiAnswer: "핵심 개념은 추상화와 효율성입니다. (백업 응답)",
      topic: topicName,
      difficulty: difficulty
    };
  }
};