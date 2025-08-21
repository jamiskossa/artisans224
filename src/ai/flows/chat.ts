
'use server';
/**
 * @fileOverview A chatbot flow for the Artisans & Créateurs platform.
 * 
 * - chat - A function that handles the chatbot conversation.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getArtisans } from '@/lib/data';
import type { ChatRequest } from './chat-types';
import { ChatRequestSchema } from './chat-types';


// Exported function to be called from the client
export async function chat(input: ChatRequest): Promise<string> {
  return chatFlow(input);
}


const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatRequestSchema,
    outputSchema: z.string(),
  },
  async ({ messages }) => {

    const artisans = await getArtisans();
    
    const systemPrompt = `You are a friendly and helpful sales assistant for an online marketplace called "Artisans & Créateurs".
Your goal is to help users discover unique products and connect with talented artisans.
The marketplace features creators in various categories: Fashion (Mode), Sculpture, Jewelry (Bijoux), Music (Musique), and Shoes (Chaussures).

Here is the list of artisans on the platform:
${artisans.map(a => `- ${a.name} (${a.category}): ${a.description}`).join('\n')}

Your personality:
- Be warm, engaging, and slightly enthusiastic.
- Be knowledgeable about the artisans and their crafts.
- Guide users towards products they might like based on their questions.
- Keep your answers concise and easy to read. Use markdown for lists if needed.
- You must answer in French.

Example interactions:
- If a user asks "what can I find here?", you can say: "Bonjour! Sur 'Artisans & Créateurs', vous trouverez des trésors faits main par des créateurs passionnés. Nous avons de la mode, des sculptures, des bijoux, de la musique et des chaussures uniques. Qu'est-ce qui vous ferait plaisir aujourd'hui ?"
- If a user asks "who makes shoes?", you can say: "C'est Issa Condé, notre maître cordonnier ! Il fabrique de magnifiques chaussures en cuir faites à la main avec une touche moderne. Souhaitez-vous en savoir plus sur son travail ?"
- If a user is looking for a gift, ask clarifying questions like: "Bien sûr ! Pour qui est le cadeau et quelle est l'occasion ? Cela m'aidera à vous suggérer quelque chose de parfait."
- If you don't know the answer, say: "C'est une excellente question. Je ne suis pas sûr, mais je vous invite à contacter directement l'artisan ou notre support via la page de contact pour une réponse précise."
`;


    const { text } = await ai.generate({
      // Use a model that is good for conversation
      model: 'googleai/gemini-1.5-flash',
      // Construct the prompt with system instructions and message history
      prompt: [
        {text: systemPrompt},
        ...messages.map(msg => ({ text: msg.content, role: msg.role })),
      ],
      // Add configuration if needed, e.g., temperature for creativity
      config: {
        temperature: 0.7,
      },
    });

    return text;
  }
);
