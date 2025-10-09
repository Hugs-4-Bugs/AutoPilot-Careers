'use server';
/**
 * @fileOverview A Genkit flow that generates a tailored cover letter for each job application.
 *
 * - tailorCoverLetter - A function that generates a tailored cover letter.
 * - TailorCoverLetterInput - The input type for the tailorCoverLetter function.
 * - TailorCoverLetterOutput - The return type for the tailorCoverLetter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TailorCoverLetterInputSchema = z.object({
  jobDescription: z.string().describe('The job description of the job application.'),
  resume: z.string().describe('The resume of the applicant.'),
  coverLetterTemplate: z.string().describe('The cover letter template of the applicant.'),
});
export type TailorCoverLetterInput = z.infer<typeof TailorCoverLetterInputSchema>;

const TailorCoverLetterOutputSchema = z.object({
  tailoredCoverLetter: z.string().describe('The tailored cover letter for the job application.'),
});
export type TailorCoverLetterOutput = z.infer<typeof TailorCoverLetterOutputSchema>;

export async function tailorCoverLetter(input: TailorCoverLetterInput): Promise<TailorCoverLetterOutput> {
  return tailorCoverLetterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tailorCoverLetterPrompt',
  input: {schema: TailorCoverLetterInputSchema},
  output: {schema: TailorCoverLetterOutputSchema},
  prompt: `You are an expert resume and cover letter writer.

  You will use the job description and the applicant's resume to tailor the cover letter template to the specific job application.  The tailored cover letter should be professional and well-written.

  Job Description: {{{jobDescription}}}

  Resume: {{{resume}}}

  Cover Letter Template: {{{coverLetterTemplate}}}

  Tailored Cover Letter: `,
});

const tailorCoverLetterFlow = ai.defineFlow(
  {
    name: 'tailorCoverLetterFlow',
    inputSchema: TailorCoverLetterInputSchema,
    outputSchema: TailorCoverLetterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
