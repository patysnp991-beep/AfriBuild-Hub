import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBioclimaticAdvice = async (city: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Agis comme un architecte expert en Afrique. Pour la ville de ${city}, suggère LE meilleur matériau local (Terre, Pierre, Bois, etc.) à utiliser pour les murs extérieurs pour contrer le climat actuel. Explique brièvement l'effet de sa texture ou propriété thermique. Max 30 mots.`,
    });
    
    return response.text || "Privilégiez la terre crue pour son inertie thermique.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Mode hors-ligne : Privilégiez l'orientation Nord-Sud et la brique de terre compressée (BTC).";
  }
};
