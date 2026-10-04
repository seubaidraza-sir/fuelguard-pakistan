'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Fuel, Moon, Sun, Menu, X, Search, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SITE_NAV } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

export function SiteHeader() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-card/80 backdrop-blur-xl supports-[backdrop-filter]:bg-card/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Fuel className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-base font-bold tracking-tight">FuelGuard</span>
            <span className="text-[10px] font-medium text-muted-foreground">Pakistan</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {SITE_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground',
                pathname === item.href || pathname.startsWith(item.href + '/')
                  ? 'text-foreground bg-secondary'
                  : 'text-muted-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
            <Link href="/search" aria-label="Search">
              <Search className="h-4.5 w-4.5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
            <Link href="/notifications" aria-label="Notifications">
              <Bell className="h-4.5 w-4.5" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {mounted ? (
              theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />
            ) : (
              <div className="h-4.5 w-4.5" />
            )}
          </Button>
          <Button variant="outline" size="sm" asChild className="hidden md:flex">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button size="sm" asChild className="hidden md:flex">
            <Link href="/dashboard">Dashboard</Link>
          </Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px]">
              <SheetHeader className="flex flex-row items-center justify-between">
                <SheetTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                    <Fuel className="h-4 w-4 text-primary-foreground" />
                  </div>
                  FuelGuard
                </SheetTitle>
                <Badge variant="secondary" className="text-[10px]">PK</Badge>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1">
                {SITE_NAV.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-secondary',
                        pathname === item.href
                          ? 'bg-secondary text-foreground'
                          : 'text-muted-foreground'
                      )}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                <div className="my-2 h-px bg-border" />
                <SheetClose asChild>
                  <Link href="/login" className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary">
                    Sign In
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/dashboard" className="rounded-lg bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground">
                    Dashboard
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/business" className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary">
                    Business Dashboard
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/admin" className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary">
                    Admin Panel
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/about" className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary">
                    About
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/contact" className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary">
                    Contact
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
