'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Info, BarChart3 } from 'lucide-react';
import { StatCard } from '@/components/stat-card';
import { DataStatusBadge } from '@/components/data-status-badge';
import { InflationBarChart, MultiLineChart, ComposedImpactChart } from '@/components/charts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { INFLATION_HISTORY, LATEST_INFLATION, PREVIOUS_INFLATION } from '@/lib/sample-data/inflation';
import { FUEL_PRICE_HISTORY } from '@/lib/sample-data/fuel-prices';
import { DATA_AS_OF, DATA_SOURCE, DATA_STATUS } from '@/lib/sample-data/fuel-prices';

export default function InflationPage() {
  const chartData = INFLATION_HISTORY.map((r) => ({
    date: r.month,
    cpi: r.cpi,
    food: r.foodInflation,
    transport: r.transportInflation,
    housing: r.housingInflation,
    core: r.coreInflation,
  }));

  const cpiChange = LATEST_INFLATION.cpi - PREVIOUS_INFLATION.cpi;
  const foodChange = LATEST_INFLATION.foodInflation - PREVIOUS_INFLATION.foodInflation;
  const transportChange = LATEST_INFLATION.transportInflation - PREVIOUS_INFLATION.transportInflation;
  const housingChange = LATEST_INFLATION.housingInflation - PREVIOUS_INFLATION.housingInflation;

  // Fuel price → transport inflation correlation chart
  // Take last 12 months of fuel prices (averaged per month) and transport inflation
  const impactData = INFLATION_HISTORY.slice(-12).map((infl) => {
    const monthFuelPrices = FUEL_PRICE_HISTORY.filter((f) => f.date.startsWith(infl.month));
    const avgPetrol = monthFuelPrices.length > 0
      ? monthFuelPrices.reduce((sum, f) => sum + f.petrol, 0) / monthFuelPrices.length
      : 0;
    return {
      label: infl.month,
      fuelPrice: Math.round(avgPetrol * 100) / 100,
      transportInflation: infl.transportInflation,
    };
  });

  const indicators = [
    { label: 'Headline CPI', value: LATEST_INFLATION.cpi, change: cpiChange, icon: TrendingUp, color: 'text-accent' },
    { label: 'Food Inflation', value: LATEST_INFLATION.foodInflation, change: foodChange, icon: TrendingDown, color: 'text-chart-2' },
    { label: 'Transport Inflation', value: LATEST_INFLATION.transportInflation, change: transportChange, icon: BarChart3, color: 'text-chart-4' },
    { label: 'Housing & Utilities', value: LATEST_INFLATION.housingInflation, change: housingChange, icon: TrendingUp, color: 'text-chart-3' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
            <TrendingUp className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inflation Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Official inflation indicators and trend analysis
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <DataStatusBadge status={DATA_STATUS} />
          <span className="text-xs text-muted-foreground">
            Source: {DATA_SOURCE} &middot; As of {DATA_AS_OF}
          </span>
        </div>
      </div>

      {/* Indicator Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {indicators.map((ind) => (
          <StatCard
            key={ind.label}
            label={ind.label}
            value={`${ind.value.toFixed(1)}%`}
            change={ind.change}
            changeLabel="MoM change"
            icon={<ind.icon className={`h-5 w-5 ${ind.color}`} />}
          />
        ))}
      </div>

      {/* Main Inflation Chart */}
      <Card className="mt-8 border-border/60">
        <CardHeader>
          <CardTitle className="text-lg">Inflation Indicators Over Time</CardTitle>
          <CardDescription>Year-over-year inflation by category (monthly)</CardDescription>
        </CardHeader>
        <CardContent>
          <InflationBarChart
            data={chartData}
            bars={[
              { key: 'cpi', color: 'hsl(var(--chart-1))', name: 'CPI' },
              { key: 'food', color: 'hsl(var(--chart-2))', name: 'Food' },
              { key: 'transport', color: 'hsl(var(--chart-4))', name: 'Transport' },
              { key: 'housing', color: 'hsl(var(--chart-3))', name: 'Housing' },
            ]}
            height={360}
          />
        </CardContent>
      </Card>

      {/* CPI Trend Line */}
      <Card className="mt-8 border-border/60">
        <CardHeader>
          <CardTitle className="text-lg">CPI & Core Inflation Trend</CardTitle>
          <CardDescription>Headline CPI vs core inflation (excludes food and energy)</CardDescription>
        </CardHeader>
        <CardContent>
          <MultiLineChart
            data={chartData}
            lines={[
              { key: 'cpi', color: 'hsl(var(--chart-1))', name: 'Headline CPI' },
              { key: 'core', color: 'hsl(var(--chart-3))', name: 'Core Inflation' },
            ]}
            height={300}
            yLabel="%"
          />
        </CardContent>
      </Card>

      {/* Fuel → Transport Correlation */}
      <Card className="mt-8 border-border/60">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            Fuel Prices &amp; Transport Inflation
          </CardTitle>
          <CardDescription>
            Relationship between average monthly petrol prices and transport inflation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ComposedImpactChart data={impactData} height={320} />
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-secondary/50 px-4 py-3 text-xs text-muted-foreground">
            <Info className="h-4 w-4 shrink-0 text-accent mt-0.5" />
            <div>
              <strong className="text-foreground">Important:</strong> This chart shows a correlation,
              not causation. Transport inflation is influenced by many factors beyond fuel prices,
              including vehicle costs, road infrastructure, tolls, and maintenance. Fuel prices are
              one documented factor among several. See our{' '}
              <a href="/transparency" className="text-accent hover:underline">methodology page</a> for details.
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Classification */}
      <Card className="mt-8 border-border/60">
        <CardHeader>
          <CardTitle className="text-lg">Data Classification</CardTitle>
          <CardDescription>Understanding the types of data on this page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { type: 'Official Statistics', desc: 'CPI, food, transport, housing inflation figures sourced from PBS.', badge: 'Official' },
            { type: 'Calculated Estimates', desc: 'Monthly average fuel prices computed from fortnightly data points.', badge: 'Calculated' },
            { type: 'Correlation Analysis', desc: 'Visual comparison of fuel prices and transport inflation — not a causal model.', badge: 'Analysis' },
          ].map((item) => (
            <div key={item.type} className="flex items-start gap-3 rounded-lg border border-border/60 p-4">
              <Badge variant="secondary" className="shrink-0">{item.badge}</Badge>
              <div>
                <h3 className="text-sm font-semibold">{item.type}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
