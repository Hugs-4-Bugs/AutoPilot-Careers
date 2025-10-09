import {
  Activity,
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Mail,
} from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

const stats = [
  {
    title: 'Applications Sent',
    value: '132',
    change: '+12.5%',
    icon: Mail,
  },
  {
    title: 'Interviews Scheduled',
    value: '8',
    change: '+20%',
    icon: CheckCircle2,
  },
  {
    title: 'Active Searches',
    value: '4',
    change: '2 new today',
    icon: Briefcase,
  },
];

const recentApplications = [
  {
    role: 'Senior Product Manager',
    company: 'Innovate Inc.',
    status: 'Applied',
    date: '2024-05-23',
  },
  {
    role: 'UX Designer',
    company: 'Creative Solutions',
    status: 'Interview',
    date: '2024-05-22',
  },
  {
    role: 'Frontend Developer',
    company: 'Tech Giants LLC',
    status: 'Applied',
    date: '2024-05-21',
  },
  {
    role: 'Data Scientist',
    company: 'Analytics Co.',
    status: 'Rejected',
    date: '2024-05-20',
  },
];

export default function DashboardPage() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>
                A log of your recent automated job applications.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="#">
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
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentApplications.map((app) => (
                  <TableRow key={app.role + app.company}>
                    <TableCell>
                      <div className="font-medium">{app.role}</div>
                    </TableCell>
                    <TableCell>{app.company}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          app.status === 'Interview'
                            ? 'default'
                            : app.status === 'Rejected'
                            ? 'destructive'
                            : 'secondary'
                        }
                        className="capitalize"
                      >
                        {app.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Application Health</CardTitle>
            <CardDescription>
              Response rates from different job platforms.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/01.png" alt="LinkedIn" />
                <AvatarFallback>LI</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">LinkedIn</p>
                <p className="text-sm text-muted-foreground">
                  12% response rate
                </p>
              </div>
              <div className="ml-auto font-medium">+15 apps</div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/02.png" alt="Indeed" />
                <AvatarFallback>IN</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Indeed</p>
                <p className="text-sm text-muted-foreground">
                  8% response rate
                </p>
              </div>
              <div className="ml-auto font-medium">+25 apps</div>
            </div>
             <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/03.png" alt="Naukri" />
                <AvatarFallback>NA</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Naukri</p>
                <p className="text-sm text-muted-foreground">
                  5% response rate
                </p>
              </div>
              <div className="ml-auto font-medium">+40 apps</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
