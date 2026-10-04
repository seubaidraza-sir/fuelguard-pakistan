'use client';

import { useState, useMemo } from 'react';
import { TrendingUp, Info, Calculator, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { StatCard } from '@/components/stat-card';
import { LATEST_FUEL_PRICES, DATA_AS_OF, DATA_STATUS } from '@/lib/sample-data/fuel-prices';
import { DataStatusBadge } from '@/components/data-status-badge';
import { PKR } from '@/lib/constants';

export default function InflationImpactPage() {
  const [transport, setTransport] = useState(15000);
  const [fuel, setFuel] = useState(8000);
  const [food, setFood] = useState(25000);
  const [utilities, setUtilities] = useState(12000);
  const [other, setOther] = useState(20000);
  const [income, setIncome] = useState(120000);
  const [fuelChangePct, setFuelChangePct] = useState(10);

  const results = useMemo(() => {
    const totalExpenses = transport + fuel + food + utilities + other;
    // Assume fuel price change affects the fuel budget proportionally
    // and impacts ~40% of transport budget (fuel component of transport)
    const fuelDelta = fuel * (fuelChangePct / 100);
    const transportFuelComponent = transport * 0.4;
    const transportDelta = transportFuelComponent * (fuelChangePct / 100);
    const totalDelta = fuelDelta + transportDelta;
    const newExpenses = totalExpenses + totalDelta;
    const currentDisposable = income - totalExpenses;
    const newDisposable = income - newExpenses;
    return {
      totalExpenses,
      fuelDelta,
      transportDelta,
      totalDelta,
      newExpenses,
      currentDisposable,
      newDisposable,
    };
  }, [transport, fuel, food, utilities, other, income, fuelChangePct]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
            <Calculator className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inflation Impact Calculator</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Estimate how fuel price changes could affect your monthly budget
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <DataStatusBadge status={DATA_STATUS} />
          <span className="text-xs text-muted-foreground">Fuel prices as of {DATA_AS_OF}</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Inputs */}
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-lg">Your Monthly Budget</CardTitle>
            <CardDescription>Enter your current monthly spending</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="mb-1.5 block text-sm">Monthly Income (PKR)</Label>
              <Input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value) || 0)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="mb-1.5 block text-sm">Transport (PKR)</Label>
                <Input type="number" value={transport} onChange={(e) => setTransport(Number(e.target.value) || 0)} />
              </div>
              <div>
                <Label className="mb-1.5 block text-sm">Fuel (PKR)</Label>
                <Input type="number" value={fuel} onChange={(e) => setFuel(Number(e.target.value) || 0)} />
              </div>
              <div>
                <Label className="mb-1.5 block text-sm">Food (PKR)</Label>
                <Input type="number" value={food} onChange={(e) => setFood(Number(e.target.value) || 0)} />
              </div>
              <div>
                <Label className="mb-1.5 block text-sm">Utilities (PKR)</Label>
                <Input type="number" value={utilities} onChange={(e) => setUtilities(Number(e.target.value) || 0)} />
              </div>
              <div className="col-span-2">
                <Label className="mb-1.5 block text-sm">Other Expenses (PKR)</Label>
                <Input type="number" value={other} onChange={(e) => setOther(Number(e.target.value) || 0)} />
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <Label className="mb-2 block text-sm">
                Fuel Price Change Scenario: {fuelChangePct > 0 ? '+' : ''}{fuelChangePct}%
              </Label>
              <Slider
                value={[fuelChangePct]}
                onValueChange={(v) => setFuelChangePct(v[0])}
                min={-30}
                max={30}
                step={5}
              />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>-30%</span>
                <span className={`font-semibold ${fuelChangePct > 0 ? 'text-destructive' : fuelChangePct < 0 ? 'text-success' : ''}`}>
                  {fuelChangePct > 0 ? '+' : ''}{fuelChangePct}%
                </span>
                <span>+30%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Current Expenses" value={PKR(results.totalExpenses)} icon={<Wallet className="h-5 w-5 text-chart-3" />} />
            <StatCard label="Current Disposable" value={PKR(results.currentDisposable)} icon={<Wallet className="h-5 w-5 text-success" />} />
          </div>

          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Scenario Impact
              </CardTitle>
              <CardDescription>If fuel prices change by {fuelChangePct > 0 ? '+' : ''}{fuelChangePct}%</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className={`rounded-lg border p-3 ${results.fuelDelta > 0 ? 'border-destructive/30 bg-destructive/5' : 'border-success/30 bg-success/5'}`}>
                  <div className="text-xs text-muted-foreground">Fuel Cost Change</div>
                  <div className={`mt-1 text-lg font-bold ${results.fuelDelta > 0 ? 'text-destructive' : 'text-success'}`}>
                    {results.fuelDelta > 0 ? '+' : ''}{PKR(results.fuelDelta)}
                  </div>
                </div>
                <div className={`rounded-lg border p-3 ${results.transportDelta > 0 ? 'border-destructive/30 bg-destructive/5' : 'border-success/30 bg-success/5'}`}>
                  <div className="text-xs text-muted-foreground">Transport Cost Change</div>
                  <div className={`mt-1 text-lg font-bold ${results.transportDelta > 0 ? 'text-destructive' : 'text-success'}`}>
                    {results.transportDelta > 0 ? '+' : ''}{PKR(results.transportDelta)}
                  </div>
                </div>
              </div>

              <div className={`rounded-xl border-2 p-4 ${results.totalDelta > 0 ? 'border-destructive/40' : 'border-success/40'}`}>
                <div className="text-sm text-muted-foreground">Total Additional Monthly Expense</div>
                <div className={`mt-1 text-3xl font-bold ${results.totalDelta > 0 ? 'text-destructive' : 'text-success'}`}>
                  {results.totalDelta > 0 ? '+' : ''}{PKR(results.totalDelta)}
                </div>
              </div>

              <div className="rounded-lg border border-border p-3">
                <div className="text-xs text-muted-foreground">New Disposable Income</div>
                <div className="mt-1 text-xl font-bold">{PKR(results.newDisposable)}</div>
                <div className="text-xs text-muted-foreground">
                  {results.newDisposable < 0 ? 'Over budget!' : `${PKR(results.currentDisposable - results.newDisposable)} change`}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-warning/5">
            <CardContent className="flex items-start gap-2 py-4">
              <Info className="h-4 w-4 shrink-0 text-warning mt-0.5" />
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">This is an estimate, not an official inflation measurement.</strong>{' '}
                The calculation assumes fuel makes up ~40% of transport spending and applies the price change
                proportionally. Real-world impacts vary based on spending patterns, substitutions, and many other
                economic factors.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
