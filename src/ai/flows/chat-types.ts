
/**
 * @fileOverview Types and schemas for the chat flow.
 * 
 * - ChatMessage - The type for a single chat message.
 * - ChatRequest - The input type for the chat function.
 * - ChatMessageSchema - The Zod schema for a single chat message.
 * - ChatRequestSchema - The Zod schema for the chat flow input.
 */

import { z } from 'zod';

// Define the schema for a single message in the chat history
export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

// Define the schema for the chat flow input
export const ChatRequestSchema = z.object({
  messages: z.array(ChatMessageSchema),
});
export type ChatRequest = z.infer<typeof ChatRequestSchema>;
