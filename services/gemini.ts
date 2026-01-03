
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { ChatMessage, Laptop } from '../types';

const aiClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiResponse = async (
  messages: ChatMessage[],
  contextData: any,
  image?: { data: string; mimeType: string }
): Promise<string> => {
  const ai = aiClient();
  const systemInstruction = `
    You are TechCompare AI, a world-class hardware consultant. 
    Users will ask you about laptops and hardware troubleshooting.
    Context Data of Current Comparison: ${JSON.stringify(contextData)}
    Always be objective, prioritize performance-to-price ratios, and identify potential bottlenecks.
  `;

  const contents = messages.map(m => ({
    role: m.role,
    parts: [{ text: m.text }] as any[]
  }));

  if (image) {
    const lastMessage = contents[contents.length - 1];
    if (lastMessage) {
      lastMessage.parts.push({
        inlineData: {
          data: image.data,
          mimeType: image.mimeType
        }
      });
    }
  }

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: contents,
    config: {
      systemInstruction,
      temperature: 0.7,
    },
  });

  return response.text || "I'm sorry, I couldn't generate a response.";
};

export const getComparisonAdvisory = async (laptops: Laptop[]): Promise<string> => {
  const ai = aiClient();
  const prompt = `
    Task: Compare ${laptops.length} laptops for a buyer in India.
    Data: ${JSON.stringify(laptops.map(l => ({ 
      name: l.name, price: l.price, cpu: l.cpu, gpu: l.gpu, 
      weight: l.weight, storage: l.storageSize, display: l.displaySize 
    })))}
    
    Constraint: Provide a DENSE, 3-4 line technical summary ONLY. 
    Format:
    [WINNER] Identify the best choice and why.
    [STATS] Highlight the key spec delta (e.g., "RTX 4060 vs 3050").
    [BEST_FOR] Use-case recommendation.
    [VERDICT] Final one-word buying signal.

    Tone: Cybernetic, professional, ultra-concise.
  `;

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      temperature: 0.2,
    },
  });

  return response.text || "DECISION_MATRIX_FAILURE: DATA_SYNC_ERROR";
};

export const extractLaptopsFromBatch = async (urls: string[]): Promise<Laptop[]> => {
  const ai = aiClient();
  const prompt = `
    Analyze the following product URLs concurrently:
    ${urls.join('\n')}

    Requirement: For EACH URL, use Google Search to identify the EXACT model, current Indian pricing (INR), and technical specs.
    Extract: Brand, Model Name, CPU, GPU, RAM, Storage (GB), Display Size (Inches), Weight (kg), Screen (Nits, sRGB, Res).
    Generate benchmarks (0-100).
    Return a JSON array of Laptop objects.
  `;

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            name: { type: Type.STRING },
            brand: { type: Type.STRING },
            cpu: { type: Type.STRING },
            gpu: { type: Type.STRING },
            ram: { type: Type.NUMBER },
            storageSize: { type: Type.NUMBER },
            displaySize: { type: Type.NUMBER },
            weight: { type: Type.NUMBER },
            screen: {
              type: Type.OBJECT,
              properties: {
                nits: { type: Type.NUMBER },
                srgb: { type: Type.NUMBER },
                resolution: { type: Type.STRING }
              },
              required: ['nits', 'srgb', 'resolution']
            },
            benchmarks: {
              type: Type.OBJECT,
              properties: {
                cpu: { type: Type.NUMBER },
                gpu: { type: Type.NUMBER },
                buildQuality: { type: Type.NUMBER }
              },
              required: ['cpu', 'gpu', 'buildQuality']
            },
            price: { type: Type.NUMBER },
            image: { type: Type.STRING }
          },
          required: ['id', 'name', 'brand', 'cpu', 'gpu', 'ram', 'storageSize', 'displaySize', 'weight', 'screen', 'benchmarks', 'price', 'image']
        }
      }
    },
  });

  try {
    const rawData = response.text || "[]";
    const laptops = JSON.parse(rawData);
    return laptops.map((l: any, i: number) => ({
      ...l,
      id: l.id || `ext-${Date.now()}-${i}`
    }));
  } catch (e) {
    console.error("Failed to parse AI batch output:", e);
    return [];
  }
};
