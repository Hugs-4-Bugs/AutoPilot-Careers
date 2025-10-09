// This file implements the Genkit flow for optimizing a resume based on job descriptions.

'use server';

/**
 * @fileOverview A resume optimization AI agent. It analyzes job descriptions and suggests small changes to the resume to increase the match score.
 *
 * - optimizeResume - A function that handles the resume optimization process.
 * - OptimizeResumeInput - The input type for the optimizeResume function.
 * - OptimizeResumeOutput - The return type for the optimizeResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeResumeInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The job description to optimize the resume for.'),
  resume: z.string().describe('The resume to optimize.'),
});
export type OptimizeResumeInput = z.infer<typeof OptimizeResumeInputSchema>;

const OptimizeResumeOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe(
      'A list of suggestions to improve the resume based on the job description.'
    ),
});
export type OptimizeResumeOutput = z.infer<typeof OptimizeResumeOutputSchema>;

export async function optimizeResume(
  input: OptimizeResumeInput
): Promise<OptimizeResumeOutput> {
  return optimizeResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeResumePrompt',
  input: {schema: OptimizeResumeInputSchema},
  output: {schema: OptimizeResumeOutputSchema},
  prompt: `You are a resume optimization expert. You will analyze the job description and suggest three small changes to the resume to increase the match score.  Focus on improving keywords, phrasing and overall relevance to the job description.

Job Description: {{{jobDescription}}}

Resume: {{{resume}}}

Suggestions (3 max):
`,
});

const optimizeResumeFlow = ai.defineFlow(
  {
    name: 'optimizeResumeFlow',
    inputSchema: OptimizeResumeInputSchema,
    outputSchema: OptimizeResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
