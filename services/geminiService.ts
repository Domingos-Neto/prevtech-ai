
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message, Role } from "../types";

const SYSTEM_INSTRUCTION = `
Você é o Assistente Virtual da PREVTECH. Seu objetivo é ajudar usuários do sistema PREVTECH com dúvidas técnicas, operacionais e sobre legislação previdenciária brasileira (INSS, RPPS, cálculos de aposentadoria, etc.).

Diretrizes:
1. Seja profissional, prestativo e utilize uma linguagem clara.
2. Sempre que possível, oriente o usuário sobre onde encontrar as funcionalidades no menu do sistema PREVTECH.
3. Se a dúvida for jurídica complexa, recomende a revisão por um especialista, mas forneça o embasamento legal básico se souber.
4. Mantenha as respostas concisas e formatadas com Markdown para melhor leitura.
5. Não invente funcionalidades que não existem no sistema.
`;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key não configurada.");
    }
    this.ai = new GoogleGenAI({ apiKey });
  }

  async chat(history: Message[], userInput: string): Promise<string> {
    try {
      // Prepare history for Gemini format
      const contents = history.map(msg => ({
        role: msg.role === Role.USER ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      // Add the current user input
      contents.push({
        role: 'user',
        parts: [{ text: userInput }]
      });

      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
          topP: 0.9,
          topK: 40,
        },
      });

      return response.text || "Desculpe, não consegui processar sua solicitação.";
    } catch (error) {
      console.error("Erro ao chamar API Gemini:", error);
      throw new Error("Ocorreu um erro na comunicação com a inteligência artificial.");
    }
  }
}

export const geminiService = new GeminiService();
