import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

export default function ProfilePage() {
  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="personal">Personal Info</TabsTrigger>
        <TabsTrigger value="professional">Professional</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
      </TabsList>

      <TabsContent value="personal">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details here. This information will be used to
              autofill applications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" defaultValue="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" defaultValue="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue="+1 (123) 456-7890" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Current Location</Label>
              <Input id="location" defaultValue="San Francisco, CA" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="professional">
        <Card>
          <CardHeader>
            <CardTitle>Professional Details</CardTitle>
            <CardDescription>
              Manage your experience, skills, and other professional information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input id="experience" type="number" defaultValue="5" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills">Skill Tags (comma-separated)</Label>
              <Input id="skills" defaultValue="React, TypeScript, Node.js, Project Management" />
              <p className="text-sm text-muted-foreground">
                These skills will be used to match you with relevant jobs.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn Profile</Label>
              <Input id="linkedin" defaultValue="https://linkedin.com/in/johndoe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub/Portfolio</Label>
              <Input id="github" defaultValue="https://github.com/johndoe" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="documents">
        <Card>
          <CardHeader>
            <CardTitle>Resumes & Cover Letters</CardTitle>
            <CardDescription>
              Upload your resume and manage your cover letter templates.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="resume">Resume (PDF)</Label>
              <Input id="resume" type="file" accept=".pdf" />
              <p className="text-sm text-muted-foreground">
                Current file: `John_Doe_Resume_2024.pdf`
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cover-letter">Default Cover Letter Template</Label>
              <Textarea
                id="cover-letter"
                rows={10}
                placeholder="Write your cover letter template here. Use placeholders like {{company}} and {{role}}."
                defaultValue="Dear Hiring Manager at {{company}}, I am writing to express my interest in the {{role}} position..."
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <Button>Save Documents</Button>
            <p className="text-sm text-muted-foreground">
              You can add multiple resume versions and cover letter templates in the Settings.
            </p>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
