'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
    cta: 'Select Plan',
    isPaid: false,
  },
  {
    name: 'Starter',
    price: '$10',
    period: '/ month',
    description: 'Perfect for a more active search.',
    features: [
      '25 Automated Applications / week',
      'Advanced Resume Optimization',
      'Limited AI Cover Letters',
      'Standard Job Search Filters',
    ],
    cta: 'Select Plan',
    isPaid: true,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/ month',
    description: 'For professionals who want to accelerate their job search.',
    features: [
      '100 Automated Applications / week',
      'Advanced Resume Optimization',
      'Unlimited AI Cover Letters',
      'Unlimited Job Search Filters',
      'Priority Support',
    ],
    cta: 'Select Plan',
    isPaid: true,
  },
];

export default function PricingPage() {
  const [selectedTier, setSelectedTier] = useState('Pro');
  const router = useRouter();

  const handleSelectPlan = (isPaid: boolean) => {
    if (isPaid) {
      // In a real app, you'd redirect to a payment gateway like Stripe.
      // For now, we will simulate this by just moving to the profile page.
      alert('This would redirect to a payment provider.');
      router.push('/dashboard/profile');
    } else {
      // For free plans, go directly to the profile page.
      router.push('/dashboard/profile');
    }
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 md:px-6">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
          Find the Plan That's Right for You
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose a plan to get started. You can always upgrade later.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
        {pricingTiers.map(tier => (
          <Card
            key={tier.name}
            className={cn(
              'flex cursor-pointer flex-col transition-all',
              selectedTier === tier.name
                ? 'border-primary ring-2 ring-primary'
                : 'hover:scale-105'
            )}
            onClick={() => setSelectedTier(tier.name)}
          >
            <CardHeader>
              <CardTitle className="text-2xl">{tier.name}</CardTitle>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">{tier.price}</span>
                {tier.period && (
                  <span className="text-muted-foreground">{tier.period}</span>
                )}
              </div>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <ul className="space-y-3">
                {tier.features.map(feature => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={selectedTier === tier.name ? 'default' : 'outline'}
                onClick={() => handleSelectPlan(tier.isPaid)}
                disabled={selectedTier !== tier.name}
              >
                {tier.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
