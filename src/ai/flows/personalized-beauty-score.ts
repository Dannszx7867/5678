// personalized-beauty-score.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a personalized beauty score based on user ratings of models.
 *
 * - generatePersonalizedBeautyScore - A function that generates a personalized beauty score.
 * - PersonalizedBeautyScoreInput - The input type for the generatePersonalizedBeautyScore function.
 * - PersonalizedBeautyScoreOutput - The return type for the generatePersonalizedBeautyScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedBeautyScoreInputSchema = z.object({
  ratings: z
    .array(z.object({modelName: z.string(), rating: z.boolean()}))
    .describe('An array of model ratings, where each object contains the model name and a boolean rating (true for Like, false for Dislike).'),
});
export type PersonalizedBeautyScoreInput = z.infer<typeof PersonalizedBeautyScoreInputSchema>;

const PersonalizedBeautyScoreOutputSchema = z.object({
  beautyScore:
    z
      .number()
      .describe('A personalized beauty score calculated based on the user provided ratings.'),
  suggestedContent:
    z
      .string()
      .describe('A personalized message enticing the user to unlock model content based on the beauty score.'),
});
export type PersonalizedBeautyScoreOutput = z.infer<typeof PersonalizedBeautyScoreOutputSchema>;

export async function generatePersonalizedBeautyScore(
  input: PersonalizedBeautyScoreInput
): Promise<PersonalizedBeautyScoreOutput> {
  return personalizedBeautyScoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedBeautyScorePrompt',
  input: {schema: PersonalizedBeautyScoreInputSchema},
  output: {schema: PersonalizedBeautyScoreOutputSchema},
  prompt: `You are an AI assistant designed to generate a personalized beauty score based on user ratings of models, in Spanish.

You will receive an array of model ratings, where each object contains the model name and a boolean rating (true for "Me gusta", false for "No me gusta").

Based on these ratings, calculate a beauty score between 0 and 100, where higher scores indicate a stronger connection with the models.

Generate a personalized message in Spanish to entice the user to unlock model content. The message should:
- Be concise and engaging.
- Highlight the exclusivity of the content.
- Create a sense of urgency.
- Refer to the generated beauty score.

Here are the user's ratings:
{{#each ratings}}
  Model: {{this.modelName}}, Rating: {{#if this.rating}}Me gusta{{else}}No me gusta{{/if}}
{{/each}}

Here's an example output in Spanish:
{
  "beautyScore": 85,
  "suggestedContent": "¡Felicitaciones! Tu Puntuación de Belleza es 85. ¡Desbloquea contenido exclusivo de las modelos que te encantaron y obtén acceso directo a su WhatsApp! Plazas limitadas."
}
`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const personalizedBeautyScoreFlow = ai.defineFlow(
  {
    name: 'personalizedBeautyScoreFlow',
    inputSchema: PersonalizedBeautyScoreInputSchema,
    outputSchema: PersonalizedBeautyScoreOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
