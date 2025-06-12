
'use server';

/**
 * @fileOverview An AI agent to greet new users and offer assistance.
 *
 * - greetAndAssist - A function that greets the user and offers assistance.
 * - GreetAndAssistInput - The input type for the greetAndAssist function.
 * - GreetAndAssistOutput - The return type for the greetAndAssist function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GreetAndAssistInputSchema = z.object({
  firstMessage: z.boolean().describe('Whether this is the first message from the user.'),
});
export type GreetAndAssistInput = z.infer<typeof GreetAndAssistInputSchema>;

const GreetAndAssistOutputSchema = z.object({
  greeting: z.string().describe('The greeting message for the user.'),
});
export type GreetAndAssistOutput = z.infer<typeof GreetAndAssistOutputSchema>;

export async function greetAndAssist(input: GreetAndAssistInput): Promise<GreetAndAssistOutput> {
  return greetAndAssistFlow(input);
}

const prompt = ai.definePrompt({
  name: 'greetAndAssistPrompt',
  input: {schema: GreetAndAssistInputSchema},
  output: {schema: GreetAndAssistOutputSchema},
  prompt: `{{#if firstMessage}}
Hello! I'm the Xoire Al Assistant. How can I help you learn about Xoire Al today?
{{else}}
How can I assist you further? You can also **Book a Meeting** or fill out the **Contact Form** at the bottom of the page.
{{/if}}`,
});

const greetAndAssistFlow = ai.defineFlow(
  {
    name: 'greetAndAssistFlow',
    inputSchema: GreetAndAssistInputSchema,
    outputSchema: GreetAndAssistOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
