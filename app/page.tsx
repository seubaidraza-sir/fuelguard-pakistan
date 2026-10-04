'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Fuel,
  TrendingUp,
  Calculator,
  ArrowRight,
  Activity,
  IndianRupee,
  Info,
  ShieldCheck,
  BarChart3,
} from 'lucide-react';
import { StatCard } from '@/components/stat-card';
import { DataStatusBadge, DataSourceNote } from '@/components/data-status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  LATEST_FUEL_PRICES,
  PREVIOUS_FUEL_PRICES,
  DATA_AS_OF,
  DATA_SOURCE,
  DATA_STATUS,
} from '@/lib/sample-data/fuel-prices';
import { LATEST_INFLATION } from '@/lib/sample-data/inflation';
import { PKR, PCT } from '@/lib/constants';

function pctChange(current: number, previous: number): number {
  return ((current - previous) / previous) * 100;
}

export default function HomePage() {
  const petrolChange = pctChange(LATEST_FUEL_PRICES.petrol, PREVIOUS_FUEL_PRICES.petrol);
  const dieselChange = pctChange(LATEST_FUEL_PRICES.diesel, PREVIOUS_FUEL_PRICES.diesel);

  // Example fuel cost estimate (clearly labeled as estimate)
  const exampleEfficiency = 12; // km/L
  const exampleDailyKm = 30;
  const exampleMonthlyCost = (exampleDailyKm / exampleEfficiency) * LATEST_FUEL_PRICES.petrol * 30;

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-grid-pattern bg-grid-size opacity-[0.03] pointer-events-none" />
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" className="mb-4 gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                Transparency-First Platform
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Understand Fuel Prices.{' '}
                <span className="text-accent">Understand Inflation.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground text-balance">
                Track fuel prices, monitor inflation trends, calculate transportation costs,
                and understand how energy prices affect everyday expenses.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <Link href="/fuel-prices">
                    <Fuel className="mr-2 h-4.5 w-4.5" />
                    Check Fuel Prices
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/inflation">
                    <TrendingUp className="mr-2 h-4.5 w-4.5" />
                    Explore Inflation
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/calculator">
                    <Calculator className="mr-2 h-4.5 w-4.5" />
                    Calculate Fuel Cost
                  </Link>
                </Button>
              </div>
              <div className="mt-6">
                <DataSourceNote source={DATA_SOURCE} date={DATA_AS_OF} status={DATA_STATUS} />
              </div>
            </motion.div>

            {/* Live Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative"
            >
              <Card className="border-border/60 shadow-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Activity className="h-4 w-4 text-accent" />
                    Live Price Preview
                  </CardTitle>
                  <DataStatusBadge status={DATA_STATUS} />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-border bg-secondary/50 p-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Fuel className="h-3.5 w-3.5" />
                        Petrol
                      </div>
                      <div className="mt-1 text-2xl font-bold">
                        {PKR(LATEST_FUEL_PRICES.petrol)}
                      </div>
                      <div className="text-xs text-muted-foreground">per litre</div>
                      <div className={`mt-1 text-xs font-semibold ${petrolChange > 0 ? 'text-destructive' : 'text-success'}`}>
                        {PCT(petrolChange)} vs previous
                      </div>
                    </div>
                    <div className="rounded-lg border border-border bg-secondary/50 p-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Fuel className="h-3.5 w-3.5" />
                        Diesel
                      </div>
                      <div className="mt-1 text-2xl font-bold">
                        {PKR(LATEST_FUEL_PRICES.diesel)}
                      </div>
                      <div className="text-xs text-muted-foreground">per litre</div>
                      <div className={`mt-1 text-xs font-semibold ${dieselChange > 0 ? 'text-destructive' : 'text-success'}`}>
                        {PCT(dieselChange)} vs previous
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 border-t border-border pt-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Monthly Change</div>
                      <div className={`text-sm font-bold ${petrolChange > 0 ? 'text-destructive' : 'text-success'}`}>
                        {PCT(petrolChange)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">CPI Inflation</div>
                      <div className="text-sm font-bold text-foreground">
                        {LATEST_INFLATION.cpi.toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Est. Monthly Cost</div>
                      <div className="text-sm font-bold text-foreground">
                        {PKR(exampleMonthlyCost)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2 text-xs text-muted-foreground">
                    <Info className="h-3.5 w-3.5 shrink-0 text-accent" />
                    Monthly cost estimate: 30 km/day at 12 km/L.{' '}
                    <Link href="/calculator" className="font-medium text-accent hover:underline">
                      Calculate yours →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Stats Strip */}
      <section className="border-b border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard
              label="Petrol Price"
              value={PKR(LATEST_FUEL_PRICES.petrol)}
              unit="/L"
              change={petrolChange}
              changeLabel="vs previous"
              icon={<Fuel className="h-5 w-5 text-accent" />}
            />
            <StatCard
              label="Diesel Price"
              value={PKR(LATEST_FUEL_PRICES.diesel)}
              unit="/L"
              change={dieselChange}
              changeLabel="vs previous"
              icon={<Fuel className="h-5 w-5 text-chart-2" />}
            />
            <StatCard
              label="Headline CPI"
              value={`${LATEST_INFLATION.cpi.toFixed(1)}%`}
              change={LATEST_INFLATION.cpi - LATEST_INFLATION.transportInflation}
              changeLabel="YoY"
              icon={<TrendingUp className="h-5 w-5 text-chart-4" />}
            />
            <StatCard
              label="Transport Inflation"
              value={`${LATEST_INFLATION.transportInflation.toFixed(1)}%`}
              change={LATEST_INFLATION.transportInflation}
              changeLabel="YoY"
              icon={<BarChart3 className="h-5 w-5 text-chart-3" />}
            />
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to understand fuel costs
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">
            Verified data, transparent calculations, and powerful tools to help you make informed decisions.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Fuel Price Dashboard',
              description: 'Current and historical petrol, diesel, and other fuel prices with interactive charts.',
              href: '/fuel-prices',
              icon: Fuel,
              color: 'text-accent',
            },
            {
              title: 'Inflation Analytics',
              description: 'CPI, food, transport, and housing inflation indicators with trend analysis.',
              href: '/inflation',
              icon: TrendingUp,
              color: 'text-chart-2',
            },
            {
              title: 'Fuel Cost Calculator',
              description: 'Calculate daily, weekly, monthly, and annual fuel expenses for any vehicle.',
              href: '/calculator',
              icon: Calculator,
              color: 'text-chart-4',
            },
            {
              title: 'Scenario Simulator',
              description: 'See how fuel price changes could affect your expenses with transparent "What If?" tools.',
              href: '/scenarios',
              icon: Activity,
              color: 'text-chart-3',
            },
            {
              title: 'Transportation Costs',
              description: 'Cost per kilometre, trip costs, and operating expenses for cars, bikes, vans, and trucks.',
              href: '/transport',
              icon: IndianRupee,
              color: 'text-chart-5',
            },
            {
              title: 'Education Center',
              description: 'Simple, accessible explanations of inflation, CPI, fuel efficiency, and more.',
              href: '/education',
              icon: Info,
              color: 'text-accent',
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link href={feature.href}>
                <Card className="group h-full border-border/60 transition-all hover:border-accent/40 hover:shadow-lg">
                  <CardHeader>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                    <CardTitle className="mt-2 text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
                      Explore
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Transparency Section */}
      <section className="border-t border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge variant="secondary" className="mb-4 gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                Our Commitment
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight">
                Transparency is not optional. It is the core.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Every number on this platform shows its source, date, and methodology.
                We never fabricate live data, never present estimates as official statistics,
                and never tell you which policies to support.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="outline" asChild>
                  <Link href="/transparency">How Our Numbers Work</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/sources">Sources &amp; Methodology</Link>
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { title: 'Sourced Data', desc: 'Official sources cited for every figure — OGRA, PBS, SBP.' },
                { title: 'Clear Labels', desc: 'Official statistics vs. calculated estimates are always distinguished.' },
                { title: 'No Fake Live Data', desc: 'If data is not available, we show the latest verified dataset and its date.' },
                { title: 'Methodology Disclosed', desc: 'Calculation formulas and assumptions are visible and explained.' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border/60 bg-card p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <ShieldCheck className="h-4.5 w-4.5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
