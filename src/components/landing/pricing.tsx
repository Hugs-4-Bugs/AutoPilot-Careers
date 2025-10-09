import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';

const pricingTiers = [
  {
    name: 'Free',
    price: '$0',
    period: '/ month',
    description: 'For individuals starting out.',
    features: [
      '5 Automated Applications / week',
      'Basic Resume Optimization',
      'Limited Job Search Filters',
    ],
    cta: 'Get Started',
    isPrimary: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/ month',
    description: 'For professionals who want to accelerate their job search.',
    features: [
      '50 Automated Applications / week',
      'Advanced Resume Optimization',
      'AI Cover Letter Generation',
      'Unlimited Job Search Filters',
      'Priority Support',
    ],
    cta: 'Upgrade to Pro',
    isPrimary: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For teams and organizations.',
    features: [
      'Unlimited Automated Applications',
      'Team Management',
      'Custom Integrations',
      'Dedicated Account Manager',
    ],
    cta: 'Contact Sales',
    isPrimary: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            Find the Plan That's Right for You
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Simple, transparent pricing. No hidden fees.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={`flex flex-col ${tier.isPrimary ? 'border-primary ring-2 ring-primary' : ''}`}
            >
              <CardHeader>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.period && <span className="text-muted-foreground">{tier.period}</span>}
                </div>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={tier.isPrimary ? 'default' : 'outline'}
                  asChild
                >
                  <Link href="/signup">{tier.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
