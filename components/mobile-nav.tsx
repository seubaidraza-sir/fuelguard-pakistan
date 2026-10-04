'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Fuel, TrendingUp, Calculator, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const ITEMS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/fuel-prices', label: 'Prices', icon: Fuel },
  { href: '/inflation', label: 'Inflation', icon: TrendingUp },
  { href: '/calculator', label: 'Calculator', icon: Calculator },
  { href: '/dashboard', label: 'Profile', icon: User },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-xl md:hidden">
      <div className="flex items-center justify-around px-2 py-1.5">
        {ITEMS.map(({ href, label, icon: Icon }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-1 flex-col items-center gap-1 rounded-lg py-2 text-[10px] font-medium transition-colors',
                active ? 'text-accent' : 'text-muted-foreground'
              )}
            >
              <Icon className={cn('h-5 w-5', active && 'stroke-[2.5]')} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
