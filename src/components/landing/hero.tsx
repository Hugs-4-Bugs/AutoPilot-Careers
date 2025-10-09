import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Bot } from 'lucide-react';

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <section className="container grid max-w-7xl grid-cols-1 items-center gap-12 py-12 md:grid-cols-2 md:py-24">
      <div className="flex flex-col items-start gap-6">
        <h1 className="text-4xl font-extrabold tracking-tighter md:text-5xl lg:text-6xl">
          Your Job Search on AutoPilot
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          Stop wasting time on repetitive applications. Our AI-powered platform
          finds and applies to the best jobs for you, so you can focus on what
          matters: acing the interview.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/signup">
              Get Started for Free <ArrowRight className="ml-2" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#features">
              <Bot className="mr-2" /> Learn More
            </Link>
          </Button>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl shadow-2xl">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            width={1200}
            height={800}
            className="h-full w-full object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
      </div>
    </section>
  );
}
