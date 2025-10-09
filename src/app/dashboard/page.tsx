'use client';

import {
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Mail,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  useUser,
  useFirestore,
  useCollection,
  useMemoFirebase,
} from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { useMemo } from 'react';

export default function DashboardPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const applicationsRef = useMemoFirebase(
    () => (user ? collection(firestore, 'users', user.uid, 'jobApplications') : null),
    [firestore, user]
  );
  
  const recentApplicationsQuery = useMemoFirebase(
    () => (applicationsRef ? query(applicationsRef, orderBy('applicationDate', 'desc'), limit(5)) : null),
    [applicationsRef]
  );

  const allApplicationsQuery = useMemoFirebase(
    () => (applicationsRef ? query(applicationsRef, orderBy('applicationDate', 'desc')) : null),
    [applicationsRef]
  );

  const { data: recentApplications, isLoading: isLoadingRecent } = useCollection(recentApplicationsQuery);
  const { data: allApplications, isLoading: isLoadingAll } = useCollection(allApplicationsQuery);

  const stats = useMemo(() => {
    if (!allApplications) {
      return [
        { title: 'Applications Sent', value: '0', icon: Mail },
        { title: 'Interviews Scheduled', value: '0', icon: CheckCircle2 },
        { title: 'Active Searches', value: '0', icon: Briefcase },
      ];
    }
    const totalSent = allApplications.length;
    const interviews = allApplications.filter(app => app.status === 'Interviewing').length;
    const offers = allApplications.filter(app => app.status === 'Offer').length;

    return [
      { title: 'Applications Sent', value: totalSent.toString(), icon: Mail },
      { title: 'Interviews Scheduled', value: interviews.toString(), icon: CheckCircle2 },
      { title: 'Offers Received', value: offers.toString(), icon: Briefcase },
    ];
  }, [allApplications]);
  
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
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {stats.map(stat => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoadingAll ? (
                 <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <div className="text-2xl font-bold">{stat.value}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-3">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>
                A log of your 5 most recent job applications.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/dashboard/applications">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingRecent ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                       <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                    </TableCell>
                  </TableRow>
                ) : recentApplications && recentApplications.length > 0 ? (
                  recentApplications.map(app => (
                    <TableRow key={app.id}>
                      <TableCell>
                        <div className="font-medium">{app.jobTitle}</div>
                      </TableCell>
                      <TableCell>{app.company}</TableCell>
                      <TableCell>
                        <div className="font-medium">{app.platform}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={getStatusVariant(app.status)}
                          className="capitalize"
                        >
                          {app.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                   <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No recent applications found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
