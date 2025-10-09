'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bot, Loader2 } from 'lucide-react';
import { tailorCoverLetter } from '@/ai/flows/tailor-cover-letter';
import {
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  jobDescription: z
    .string()
    .min(50, 'Job description must be at least 50 characters.'),
  resume: z.string().min(100, 'Resume content must be at least 100 characters.'),
  coverLetterTemplate: z
    .string()
    .min(50, 'Cover letter template must be at least 50 characters.'),
});

export function CoverLetterTailor() {
  const [isLoading, setIsLoading] = useState(false);
  const [tailoredLetter, setTailoredLetter] = useState('');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: '',
      resume: '',
      coverLetterTemplate:
        'Dear Hiring Manager at {{company}}, I am writing to express my interest in the {{role}} position...',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setTailoredLetter('');
    try {
      const result = await tailorCoverLetter(values);
      setTailoredLetter(result.tailoredCoverLetter);
    } catch (error) {
      console.error('Failed to tailor cover letter:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'An error occurred while generating the cover letter. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cl-job-description">Job Description</Label>
          <Textarea
            id="cl-job-description"
            placeholder="Paste the job description here..."
            className="min-h-[150px]"
            {...form.register('jobDescription')}
          />
          {form.formState.errors.jobDescription && (
            <p className="text-sm text-destructive">{form.formState.errors.jobDescription.message}</p>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="cl-resume">Your Resume</Label>
            <Textarea
              id="cl-resume"
              placeholder="Paste your resume content here..."
              className="min-h-[200px]"
              {...form.register('resume')}
            />
            {form.formState.errors.resume && (
              <p className="text-sm text-destructive">{form.formState.errors.resume.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="cl-template">Cover Letter Template</Label>
            <Textarea
              id="cl-template"
              placeholder="Your cover letter template..."
              className="min-h-[200px]"
              {...form.register('coverLetterTemplate')}
            />
            {form.formState.errors.coverLetterTemplate && (
              <p className="text-sm text-destructive">{form.formState.errors.coverLetterTemplate.message}</p>
            )}
          </div>
        </div>

        {tailoredLetter && (
          <div className="space-y-2">
             <Label>Generated Cover Letter</Label>
             <Textarea
                readOnly
                className="min-h-[250px] bg-muted"
                value={tailoredLetter}
              />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Generating...' : 'Tailor Cover Letter'}
        </Button>
      </CardFooter>
    </form>
  );
}
