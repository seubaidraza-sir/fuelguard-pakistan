'use client';

import Link from 'next/link';
import { BellRing, ArrowLeft, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AlertsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Dashboard
        </Link>
      </div>
      <div className="flex items-center gap-3 mb-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
          <BellRing className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Price Alerts</h1>
          <p className="mt-1 text-sm text-muted-foreground">Get notified when prices change</p>
        </div>
      </div>

      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-lg">Create a Price Alert</CardTitle>
          <CardDescription>Choose what to monitor and how to be notified</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: 'Petrol Price Increase', desc: 'Notify me when petrol exceeds a threshold', icon: '↑', color: 'text-destructive' },
              { title: 'Petrol Price Decrease', desc: 'Notify me when petrol drops below a threshold', icon: '↓', color: 'text-success' },
              { title: 'Diesel Price Change', desc: 'Notify me when diesel prices change', icon: '↕', color: 'text-chart-2' },
              { title: 'Inflation Threshold', desc: 'Notify me when CPI crosses a level', icon: '%', color: 'text-chart-4' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border p-4 hover:border-accent/40 transition-colors cursor-pointer">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-lg font-bold">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full" asChild>
            <Link href="/notifications">
              <Plus className="mr-2 h-4 w-4" />
              Go to Alert Manager
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="mt-6 border-border/60 bg-secondary/30">
        <CardContent className="py-6">
          <h3 className="text-sm font-semibold mb-2">How Alerts Work</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Choose a fuel type or inflation indicator to monitor.</li>
            <li>Set a price threshold or percentage change trigger.</li>
            <li>Select notification channel: in-app, email, or both.</li>
            <li>You'll be notified when new verified data is published and meets your criteria.</li>
            <li>Alerts are checked against official data — never against estimated or demo values.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
