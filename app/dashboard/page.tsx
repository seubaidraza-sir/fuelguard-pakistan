'use client';

import Link from 'next/link';
import { LayoutDashboard, Fuel, Wallet, Bell, Calculator, Building2, TrendingUp, FileText, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/stat-card';
import { LATEST_FUEL_PRICES } from '@/lib/sample-data/fuel-prices';
import { LATEST_INFLATION } from '@/lib/sample-data/inflation';
import { PKR } from '@/lib/constants';

export default function DashboardPage() {
  const quickLinks = [
    { href: '/budget', label: 'Household Budget', desc: 'Track income and expenses', icon: Wallet, color: 'text-accent' },
    { href: '/business', label: 'Business Dashboard', desc: 'Fleet management and costs', icon: Building2, color: 'text-chart-2' },
    { href: '/calculator', label: 'Fuel Cost Calculator', desc: 'Calculate vehicle fuel costs', icon: Calculator, color: 'text-chart-4' },
    { href: '/scenarios', label: 'Scenario Simulator', desc: 'What if fuel prices change?', icon: TrendingUp, color: 'text-chart-3' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
            <LayoutDashboard className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage your budgets, alerts, and calculations</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Current Petrol" value={PKR(LATEST_FUEL_PRICES.petrol)} unit="/L" icon={<Fuel className="h-5 w-5 text-accent" />} />
        <StatCard label="Current Diesel" value={PKR(LATEST_FUEL_PRICES.diesel)} unit="/L" icon={<Fuel className="h-5 w-5 text-chart-2" />} />
        <StatCard label="CPI Inflation" value={`${LATEST_INFLATION.cpi.toFixed(1)}%`} icon={<TrendingUp className="h-5 w-5 text-chart-4" />} />
        <StatCard label="Active Alerts" value="0" icon={<Bell className="h-5 w-5 text-chart-3" />} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Card className="group h-full border-border/60 transition-all hover:border-accent/40 hover:shadow-md">
                  <CardContent className="flex items-center gap-4 py-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
                      <link.icon className={`h-5.5 w-5.5 ${link.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold">{link.label}</h3>
                      <p className="text-xs text-muted-foreground">{link.desc}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5 text-accent" />
                Price Alerts
              </CardTitle>
              <CardDescription>Get notified when prices change</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Create alerts for petrol or diesel price thresholds, and inflation indicators.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/alerts">Create Alert</Link>
              </Button>
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/notifications">View Notifications</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-accent" />
                Reports
              </CardTitle>
              <CardDescription>Generate and download reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {['Monthly Fuel Expense', 'Fuel Price History', 'Household Budget', 'Business Fuel Report'].map((report) => (
                <div key={report} className="flex items-center justify-between rounded-lg border border-border p-2.5 text-sm">
                  <span className="text-muted-foreground">{report}</span>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">Export</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
