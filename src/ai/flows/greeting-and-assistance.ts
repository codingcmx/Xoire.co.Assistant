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
🤖 Welcome to XOIRE AI! I'm here to assist you with any questions you have about our services and products.

XOIRE AI helps you **Build Smart, Scale Faster, and Rule with AI.** We provide premium AI systems, including:

- **AI Trading Systems** (*TradeTitan AI*)
- **Business Automation** (*AutoNexus Flow*)
- **AI Lead Generation** (*LeadSpark AI*)
- **AI Marketing**
- **AI Coding Tools**
- **Intelligent Chatbots**

How can I help you today?  You can also **Book a Meeting** or fill out the **Contact Form** at the bottom of the page.
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
