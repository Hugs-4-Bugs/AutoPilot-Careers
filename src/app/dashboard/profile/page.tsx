'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUser, useDoc, useFirestore, useMemoFirebase, setDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';
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
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  experience: z.coerce.number().optional(),
  skills: z.string().optional(),
  linkedin: z.string().url().or(z.literal('')).optional(),
  github: z.string().url().or(z.literal('')).optional(),
});

export default function ProfilePage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const userProfileRef = useMemoFirebase(
    () => (user ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );
  const { data: userProfile, isLoading: isProfileLoading } = useDoc(userProfileRef);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      experience: 0,
      skills: '',
      linkedin: '',
      github: '',
    },
  });

  useEffect(() => {
    if (userProfile) {
      reset({
        ...userProfile,
        email: user?.email || '',
      });
    } else if (user) {
      reset({
        email: user.email || '',
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ')[1] || '',
      })
    }
  }, [userProfile, user, reset]);

  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    if (!userProfileRef) return;
    try {
      setDocumentNonBlocking(userProfileRef, data, { merge: true });
      toast({
        title: 'Profile Updated',
        description: 'Your changes have been saved.',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: 'Could not save your changes. Please try again.',
      });
    }
  };

  if (isProfileLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                Update your personal details here. This information will be used
                to autofill applications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" {...register('firstName')} />
                  {errors.firstName && <p className="text-destructive text-sm">{errors.firstName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" {...register('lastName')} />
                  {errors.lastName && <p className="text-destructive text-sm">{errors.lastName.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register('email')} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" {...register('phone')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Current Location</Label>
                <Input id="location" {...register('location')} />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="professional">
          <Card>
            <CardHeader>
              <CardTitle>Professional Details</CardTitle>
              <CardDescription>
                Manage your experience, skills, and other professional
                information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input id="experience" type="number" {...register('experience')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Skill Tags (comma-separated)</Label>
                <Input id="skills" {...register('skills')} />
                <p className="text-sm text-muted-foreground">
                  These skills will be used to match you with relevant jobs.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input id="linkedin" {...register('linkedin')} />
                 {errors.linkedin && <p className="text-destructive text-sm">{errors.linkedin.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub/Portfolio</Label>
                <Input id="github" {...register('github')} />
                 {errors.github && <p className="text-destructive text-sm">{errors.github.message}</p>}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSubmitting}>
                 {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
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
                <Label htmlFor="cover-letter">
                  Default Cover Letter Template
                </Label>
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
                You can add multiple resume versions and cover letter templates
                in the Settings.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
}
