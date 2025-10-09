import { ResumeOptimizer } from '@/components/dashboard/ai/resume-optimizer';
import { CoverLetterTailor } from '@/components/dashboard/ai/cover-letter-tailor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AiToolsPage() {
  return (
    <Tabs defaultValue="optimizer" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="optimizer">Resume Optimizer</TabsTrigger>
        <TabsTrigger value="tailor">Cover Letter Tailor</TabsTrigger>
      </TabsList>
      <TabsContent value="optimizer">
        <Card>
          <CardHeader>
            <CardTitle>Targeted Candidate Profile Optimizer</CardTitle>
            <CardDescription>
              Analyze a job description and get AI-powered suggestions to
              improve your resume's match score.
            </CardDescription>
          </CardHeader>
          <ResumeOptimizer />
        </Card>
      </TabsContent>
      <TabsContent value="tailor">
        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Cover Letter Tailoring</CardTitle>
            <CardDescription>
              Generate a tailored cover letter for a specific job based on your
              resume and a cover letter template.
            </CardDescription>
          </CardHeader>
          <CoverLetterTailor />
        </Card>
      </TabsContent>
    </Tabs>
  );
}
