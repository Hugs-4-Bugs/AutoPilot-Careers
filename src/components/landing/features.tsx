import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, FileSearch, SearchCheck } from 'lucide-react';

const featuresList = [
  {
    icon: <SearchCheck className="h-8 w-8 text-primary" />,
    title: 'Automated Job Search',
    description:
      'Our system continuously scans multiple job boards to find the latest opportunities that perfectly match your profile and preferences.',
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'AI-Powered Applications',
    description:
      'Let our AI tailor your resume and generate compelling cover letters for each application, maximizing your chances of getting noticed.',
  },
  {
    icon: <FileSearch className="h-8 w-8 text-primary" />,
    title: 'Smart Profile Optimizer',
    description:
      'Get actionable suggestions on how to improve your resume based on the job descriptions of your target roles. Stay ahead of the competition.',
  },
];

export function Features() {
  return (
    <section id="features" className="bg-card py-16 md:py-24">
      <div className="container max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            A Smarter Way to Get Hired
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            AutoPilot Careers is more than just an automation tool. It's your personal career agent.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {featuresList.map((feature) => (
            <Card key={feature.title} className="flex flex-col items-center text-center">
              <CardHeader>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
