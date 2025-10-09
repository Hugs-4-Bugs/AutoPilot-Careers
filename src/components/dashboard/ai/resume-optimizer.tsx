'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lightbulb, Loader2 } from 'lucide-react';
import { optimizeResume } from '@/ai/flows/optimize-resume';
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
});

export function ResumeOptimizer() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: '',
      resume: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSuggestions([]);
    try {
      const result = await optimizeResume(values);
      setSuggestions(result.suggestions);
    } catch (error) {
      console.error('Failed to optimize resume:', error);
      toast({
        variant: 'destructive',
        title: 'Optimization Failed',
        description: 'An error occurred while analyzing your resume. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="job-description">Job Description</Label>
            <Textarea
              id="job-description"
              placeholder="Paste the job description here..."
              className="min-h-[200px] md:min-h-[300px]"
              {...form.register('jobDescription')}
            />
            {form.formState.errors.jobDescription && (
              <p className="text-sm text-destructive">
                {form.formState.errors.jobDescription.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="resume-content">Your Resume</Label>
            <Textarea
              id="resume-content"
              placeholder="Paste your resume content here..."
              className="min-h-[200px] md:min-h-[300px]"
              {...form.register('resume')}
            />
             {form.formState.errors.resume && (
              <p className="text-sm text-destructive">
                {form.formState.errors.resume.message}
              </p>
            )}
          </div>
        </div>

        {suggestions.length > 0 && (
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Optimization Suggestions</AlertTitle>
            <AlertDescription>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Analyzing...' : 'Optimize Resume'}
        </Button>
      </CardFooter>
    </form>
  );
}
