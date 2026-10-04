'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Fuel, Calendar, TrendingDown, TrendingUp, Download, History } from 'lucide-react';
import { StatCard } from '@/components/stat-card';
import { DataStatusBadge, DataSourceNote } from '@/components/data-status-badge';
import { FuelPriceAreaChart, MultiLineChart } from '@/components/charts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  FUEL_PRICE_HISTORY,
  LATEST_FUEL_PRICES,
  PREVIOUS_FUEL_PRICES,
  DATA_AS_OF,
  DATA_SOURCE,
  DATA_STATUS,
} from '@/lib/sample-data/fuel-prices';
import { PKR, PCT } from '@/lib/constants';

type Range = '7d' | '30d' | '6m' | '1y' | '5y';

const RANGE_DAYS: Record<Range, number> = {
  '7d': 7,
  '30d': 30,
  '6m': 180,
  '1y': 365,
  '5y': 1825,
};

function pctChange(current: number, previous: number): number {
  return ((current - previous) / previous) * 100;
}

function filterByRange(data: typeof FUEL_PRICE_HISTORY, range: Range) {
  if (range === '5y') return data;
  const days = RANGE_DAYS[range];
  const cutoff = new Date(data[data.length - 1].date);
  cutoff.setDate(cutoff.getDate() - days);
  return data.filter((r) => new Date(r.date) >= cutoff);
}

export default function FuelPricesPage() {
  const [range, setRange] = useState<Range>('6m');

  const filteredData = useMemo(() => filterByRange(FUEL_PRICE_HISTORY, range), [range]);

  const chartData = filteredData.map((r) => ({
    date: new Date(r.date).toLocaleDateString('en-PK', { month: 'short', day: 'numeric', year: '2-digit' }),
    petrol: r.petrol,
    diesel: r.diesel,
    kerosene: r.kerosene,
  }));

  const petrolChange = pctChange(LATEST_FUEL_PRICES.petrol, PREVIOUS_FUEL_PRICES.petrol);
  const dieselChange = pctChange(LATEST_FUEL_PRICES.diesel, PREVIOUS_FUEL_PRICES.diesel);
  const keroseneChange = pctChange(LATEST_FUEL_PRICES.kerosene, PREVIOUS_FUEL_PRICES.kerosene);

  const priceRows = [
    {
      name: 'Petrol (MS)',
      current: LATEST_FUEL_PRICES.petrol,
      previous: PREVIOUS_FUEL_PRICES.petrol,
      change: LATEST_FUEL_PRICES.petrol - PREVIOUS_FUEL_PRICES.petrol,
      pct: petrolChange,
      unit: 'PKR/L',
    },
    {
      name: 'High-Speed Diesel (HSD)',
      current: LATEST_FUEL_PRICES.diesel,
      previous: PREVIOUS_FUEL_PRICES.diesel,
      change: LATEST_FUEL_PRICES.diesel - PREVIOUS_FUEL_PRICES.diesel,
      pct: dieselChange,
      unit: 'PKR/L',
    },
    {
      name: 'Kerosene Oil (SKO)',
      current: LATEST_FUEL_PRICES.kerosene,
      previous: PREVIOUS_FUEL_PRICES.kerosene,
      change: LATEST_FUEL_PRICES.kerosene - PREVIOUS_FUEL_PRICES.kerosene,
      pct: keroseneChange,
      unit: 'PKR/L',
    },
    {
      name: 'Light Diesel Oil (LDO)',
      current: LATEST_FUEL_PRICES.lightDiesel,
      previous: PREVIOUS_FUEL_PRICES.lightDiesel,
      change: LATEST_FUEL_PRICES.lightDiesel - PREVIOUS_FUEL_PRICES.lightDiesel,
      pct: pctChange(LATEST_FUEL_PRICES.lightDiesel, PREVIOUS_FUEL_PRICES.lightDiesel),
      unit: 'PKR/L',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
            <Fuel className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Fuel Price Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Current and historical fuel prices in Pakistan
            </p>
          </div>
        </div>
        <div className="mt-4">
          <DataSourceNote source={DATA_SOURCE} date={DATA_AS_OF} status={DATA_STATUS} />
        </div>
      </div>

      {/* Current Price Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {priceRows.map((row) => (
          <StatCard
            key={row.name}
            label={row.name}
            value={PKR(row.current)}
            unit={row.unit}
            change={row.pct}
            changeLabel={`(${row.change > 0 ? '+' : ''}${row.change.toFixed(2)} PKR)`}
            icon={<Fuel className="h-5 w-5 text-accent" />}
          />
        ))}
      </div>

      {/* Chart Section */}
      <Card className="mt-8 border-border/60">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <History className="h-5 w-5 text-accent" />
              Historical Price Trends
            </CardTitle>
            <CardDescription>Interactive fuel price history by time range</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['7d', '30d', '6m', '1y', '5y'] as Range[]).map((r) => (
              <Button
                key={r}
                size="sm"
                variant={range === r ? 'default' : 'outline'}
                onClick={() => setRange(r)}
              >
                {r === '7d' ? '7D' : r === '30d' ? '30D' : r === '6m' ? '6M' : r === '1y' ? '1Y' : '5Y'}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Fuels</TabsTrigger>
              <TabsTrigger value="petrol">Petrol</TabsTrigger>
              <TabsTrigger value="diesel">Diesel</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-0">
              <MultiLineChart
                data={chartData}
                lines={[
                  { key: 'petrol', color: 'hsl(var(--chart-1))', name: 'Petrol (PKR/L)' },
                  { key: 'diesel', color: 'hsl(var(--chart-2))', name: 'Diesel (PKR/L)' },
                  { key: 'kerosene', color: 'hsl(var(--chart-4))', name: 'Kerosene (PKR/L)' },
                ]}
                height={340}
              />
            </TabsContent>
            <TabsContent value="petrol" className="mt-0">
              <FuelPriceAreaChart data={chartData} dataKey="petrol" color="hsl(var(--chart-1))" name="Petrol (PKR/L)" height={340} />
            </TabsContent>
            <TabsContent value="diesel" className="mt-0">
              <FuelPriceAreaChart data={chartData} dataKey="diesel" color="hsl(var(--chart-2))" name="Diesel (PKR/L)" height={340} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Price Change Table */}
      <Card className="mt-8 border-border/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5 text-accent" />
            Latest Price Adjustment
          </CardTitle>
          <CardDescription>
            Effective {new Date(LATEST_FUEL_PRICES.date).toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fuel Type</TableHead>
                  <TableHead className="text-right">Previous Price</TableHead>
                  <TableHead className="text-right">Current Price</TableHead>
                  <TableHead className="text-right">Change (PKR)</TableHead>
                  <TableHead className="text-right">Change (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {priceRows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{PKR(row.previous)}</TableCell>
                    <TableCell className="text-right font-semibold">{PKR(row.current)}</TableCell>
                    <TableCell className={`text-right font-medium ${row.change > 0 ? 'text-destructive' : 'text-success'}`}>
                      {row.change > 0 ? '+' : ''}{row.change.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold ${row.pct > 0 ? 'bg-destructive/10 text-destructive' : 'bg-success/10 text-success'}`}>
                        {row.pct > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {PCT(row.pct)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Historical Data Table */}
      <Card className="mt-8 border-border/60">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Full Price History</CardTitle>
            <CardDescription>All recorded price adjustments</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-card">
                <TableRow>
                  <TableHead>Effective Date</TableHead>
                  <TableHead className="text-right">Petrol</TableHead>
                  <TableHead className="text-right">Diesel</TableHead>
                  <TableHead className="text-right">Kerosene</TableHead>
                  <TableHead className="text-right">LDO</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...filteredData].reverse().map((row) => (
                  <TableRow key={row.date}>
                    <TableCell className="font-medium whitespace-nowrap">
                      {new Date(row.date).toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </TableCell>
                    <TableCell className="text-right">{PKR(row.petrol)}</TableCell>
                    <TableCell className="text-right">{PKR(row.diesel)}</TableCell>
                    <TableCell className="text-right">{PKR(row.kerosene)}</TableCell>
                    <TableCell className="text-right">{PKR(row.lightDiesel)}</TableCell>
                    <TableCell>
                      <DataStatusBadge status={row.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
