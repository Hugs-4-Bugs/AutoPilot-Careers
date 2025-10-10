'use server';
/**
 * @fileOverview This flow acts as the primary "API" endpoint for the browser extension.
 * It orchestrates other AI flows to gather all necessary information for applying to a job.
 *
 * - applyToJob - The main function the extension will call.
 * - ApplyToJobInput - The input schema for the job application details.
 * - ApplyToJobOutput - The output schema containing the tailored cover letter and resume suggestions.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {
  optimizeResume,
  OptimizeResumeInput,
  OptimizeResumeOutput,
} from './optimize-resume';
import {
  tailorCoverLetter,
  TailorCoverLetterInput,
  TailorCoverLetterOutput,
} from './tailor-cover-letter';

export const ApplyToJobInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The full job description from the career site.'),
  userResume: z.string().describe("The user's current resume content."),
  coverLetterTemplate: z
    .string()
    .describe("The user's base cover letter template."),
  company: z.string().describe('The name of the company.'),
  role: z.string().describe('The job title or role.'),
});
export type ApplyToJobInput = z.infer<typeof ApplyToJobInputSchema>;

export const ApplyToJobOutputSchema = z.object({
  tailoredCoverLetter: z
    .string()
    .describe('The generated cover letter, tailored for the specific job.'),
  resumeSuggestions: z
    .array(z.string())
    .describe(
      'A list of suggestions for improving the resume for this job.'
    ),
});
export type ApplyToJobOutput = z.infer<typeof ApplyToJobOutputSchema>;

// This is the main function the browser extension will call.
export async function applyToJob(
  input: ApplyToJobInput
): Promise<ApplyToJobOutput> {
  return applyToJobFlow(input);
}

const applyToJobFlow = ai.defineFlow(
  {
    name: 'applyToJobFlow',
    inputSchema: ApplyToJobInputSchema,
    outputSchema: ApplyToJobOutputSchema,
  },
  async input => {
    // Step 1: Tailor the cover letter.
    const tailorCoverLetterInput: TailorCoverLetterInput = {
      jobDescription: input.jobDescription,
      resume: input.userResume,
      coverLetterTemplate: input.coverLetterTemplate,
    };
    const {tailoredCoverLetter} = await tailorCoverLetter(
      tailorCoverLetterInput
    );

    // Step 2: Optimize the resume.
    const optimizeResumeInput: OptimizeResumeInput = {
      jobDescription: input.jobDescription,
      resume: input.userResume,
    };
    const {suggestions} = await optimizeResume(optimizeResumeInput);

    // Step 3: Return the combined results.
    // The browser extension will use this output to fill the application form.
    return {
      tailoredCoverLetter,
      resumeSuggestions: suggestions,
    };
  }
);
