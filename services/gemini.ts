import { GoogleGenAI } from "@google/genai";
import { Ion, DifficultyLevel } from '../types';

// Initialize the client
// NOTE: In a real production app, ensure your build system injects process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIFeedback = async (
  cation: Ion,
  anion: Ion,
  cCount: number,
  aCount: number,
  targetName: string,
  isCorrect: boolean
): Promise<string> => {
  const model = 'gemini-2.5-flash';

  const userFormula = `${cation.symbol}${cCount > 1 ? cCount : ''}${anion.symbol}${aCount > 1 ? aCount : ''}`;
  const prompt = isCorrect
    ? `The student correctly formed ${targetName} (${userFormula}). Give a very brief (max 1 sentence), fun, or surprising real-world fact about this compound. Keep it encouraging!`
    : `The student is trying to form ${targetName} but submitted a ratio of ${cCount} ${cation.name} (${cation.charge} charge) to ${aCount} ${anion.name} (${anion.charge} charge). The net charge is ${(cation.charge * cCount) + (anion.charge * aCount)}. Explain simply why this is unbalanced and hint at the correct ratio. Keep it strictly under 30 words.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text || "Keep trying! Balance the positive and negative charges.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return isCorrect ? "Great job! Correct formula." : "Not quite. Check your charges to ensure they sum to zero.";
  }
};

export const getTutorHelp = async (level: DifficultyLevel, targetName: string, cation: Ion, anion: Ion): Promise<string> => {
  const model = 'gemini-2.5-flash';
  const prompt = `Act as a chemistry tutor for a ${level} level student. They need to make "${targetName}".
  The ions involved are ${cation.symbol} (Charge: ${cation.charge}) and ${anion.symbol} (Charge: ${anion.charge}).
  Provide a helpful hint on how to approach finding the lowest common multiple to balance the charges.
  Do not give the answer directly (like "use 2 of this"). Use an analogy if helpful. Max 2 sentences.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text || "Look at the charges of each ion. How many of each do you need so the total positive equals the total negative?";
  } catch (error) {
    return "Try finding the Least Common Multiple of the two charges.";
  }
};
