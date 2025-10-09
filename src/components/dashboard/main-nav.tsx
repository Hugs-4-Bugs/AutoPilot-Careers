'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Settings, Bot, BadgeDollarSign } from 'lucide-react';
import { Logo } from '../logo';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
   { href: '/dashboard/pricing', label: 'Pricing', icon: BadgeDollarSign },
  {
    href: '/dashboard/ai-tools',
    label: 'AI Tools',
    icon: Bot,
    badge: 'Beta',
  },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export function MainNav({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={cn(
          'flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6',
          isMobile && 'px-6'
        )}
      >
        <Logo />
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav
          className={cn(
            'grid items-start gap-1 px-2 pt-2 text-sm font-medium lg:px-4',
            isMobile && 'px-4'
          )}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                (pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))) && 'bg-muted text-primary'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
              {item.badge && (
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
