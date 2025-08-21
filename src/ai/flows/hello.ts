/**
 * @fileOverview A simple "hello world" Genkit flow.
 */
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const helloFlow = ai.defineFlow(
  {
    name: 'helloFlow',
    inputSchema: z.string().describe('Your name'),
    outputSchema: z.string().describe('A personalized greeting'),
  },
  async (name) => {
    const { text } = await ai.generate({
      prompt: `Hello Gemini, my name is ${name}. Write a short, friendly greeting.`,
    });
    return text;
  }
);
