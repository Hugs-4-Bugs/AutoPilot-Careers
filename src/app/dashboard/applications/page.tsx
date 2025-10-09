'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  useUser,
  useFirestore,
  useCollection,
  useMemoFirebase,
  addDocumentNonBlocking,
} from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { PlusCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const applicationSchema = z.object({
  jobTitle: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company name is required'),
  platform: z.string().min(1, 'Platform is required'),
  status: z.string().min(1, 'Status is required'),
  applicationDate: z.date(),
});

type Application = z.infer<typeof applicationSchema> & { id: string };

export default function ApplicationsPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const applicationsRef = useMemoFirebase(
    () => (user ? collection(firestore, 'users', user.uid, 'jobApplications') : null),
    [firestore, user]
  );
  const applicationsQuery = useMemoFirebase(
    () => (applicationsRef ? query(applicationsRef, orderBy('applicationDate', 'desc')) : null),
    [applicationsRef]
  );

  const { data: applications, isLoading: isLoadingApplications } =
    useCollection<Application>(applicationsQuery);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      jobTitle: '',
      company: '',
      platform: '',
      status: 'Applied',
      applicationDate: new Date(),
    },
  });

  const onSubmit = async (data: z.infer<typeof applicationSchema>) => {
    if (!applicationsRef) return;
    try {
      addDocumentNonBlocking(applicationsRef, {
        ...data,
        applicationDate: data.applicationDate.toISOString(),
      });
      toast({
        title: 'Application Logged',
        description: `${data.jobTitle} at ${data.company} has been added.`,
      });
      reset();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error logging application:', error);
      toast({
        variant: 'destructive',
        title: 'Logging Failed',
        description: 'Could not save your application. Please try again.',
      });
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Interviewing':
        return 'default';
      case 'Offer':
        return 'default';
      case 'Rejected':
        return 'destructive';
      case 'Applied':
      default:
        return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Job Applications</CardTitle>
          <CardDescription>
            Track all your job applications in one place.
          </CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <PlusCircle className="h-4 w-4" />
              Log Application
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Log New Application</DialogTitle>
              <DialogDescription>
                Manually add a job application you've submitted.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input id="jobTitle" {...register('jobTitle')} />
                {errors.jobTitle && <p className="text-sm text-destructive">{errors.jobTitle.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" {...register('company')} />
                {errors.company && <p className="text-sm text-destructive">{errors.company.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                 <Controller
                  name="platform"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                        <SelectItem value="Indeed">Indeed</SelectItem>
                        <SelectItem value="Company Website">Company Website</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.platform && <p className="text-sm text-destructive">{errors.platform.message}</p>}
              </div>
               <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Applied">Applied</SelectItem>
                        <SelectItem value="Interviewing">Interviewing</SelectItem>
                        <SelectItem value="Offer">Offer</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status && <p className="text-sm text-destructive">{errors.status.message}</p>}
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Log Application
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Date Applied</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingApplications ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                </TableCell>
              </TableRow>
            ) : applications && applications.length > 0 ? (
              applications.map(app => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.jobTitle}</TableCell>
                  <TableCell>{app.company}</TableCell>
                  <TableCell>{app.platform}</TableCell>
                  <TableCell>
                    {format(new Date(app.applicationDate), 'PPP')}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={getStatusVariant(app.status)}>
                      {app.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No applications logged yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
