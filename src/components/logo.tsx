import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2 text-foreground transition-colors hover:text-foreground/80',
        className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-primary"
        aria-hidden="true"
      >
        <path d="m3 3 3 9-3 9 19-9Z" />
        <path d="m3 3 19 9" />
      </svg>
      <span className="text-xl font-bold tracking-tight">
        AutoPilot Careers
      </span>
    </Link>
  );
}
