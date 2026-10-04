'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Info, TrendingUp, TrendingDown, Fuel, Truck, Home as HomeIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { LATEST_FUEL_PRICES, DATA_AS_OF, DATA_SOURCE, DATA_STATUS } from '@/lib/sample-data/fuel-prices';
import { DataStatusBadge } from '@/components/data-status-badge';
import { PKR } from '@/lib/constants';

const PRESETS = [-20, -10, 0, 10, 20];

export default function ScenariosPage() {
  const [petrolPrice, setPetrolPrice] = useState(LATEST_FUEL_PRICES.petrol);
  const [customMode, setCustomMode] = useState(false);

  // User's baseline inputs
  const [monthlyFuelLitres, setMonthlyFuelLitres] = useState(75); // litres/month
  const [monthlyTransport, setMonthlyTransport] = useState(15000);
  const [deliveryDistance, setDeliveryDistance] = useState(2000); // km/month
  const [deliveryEfficiency, setDeliveryEfficiency] = useState(10); // km/L
  const [householdExpenses, setHouseholdExpenses] = useState(80000);

  const changePct = ((petrolPrice - LATEST_FUEL_PRICES.petrol) / LATEST_FUEL_PRICES.petrol) * 100;

  const results = useMemo(() => {
    const baselineFuelCost = monthlyFuelLitres * LATEST_FUEL_PRICES.petrol;
    const newFuelCost = monthlyFuelLitres * petrolPrice;
    const personalFuelDelta = newFuelCost - baselineFuelCost;

    // Transport: assume fuel is ~40% of transport cost
    const transportFuelComponent = monthlyTransport * 0.4;
    const transportDelta = (transportFuelComponent * (petrolPrice / LATEST_FUEL_PRICES.petrol)) - transportFuelComponent;

    // Delivery: fuel cost = distance / efficiency * price
    const baselineDeliveryCost = (deliveryDistance / deliveryEfficiency) * LATEST_FUEL_PRICES.diesel;
    const newDeliveryCost = (deliveryDistance / deliveryEfficiency) * LATEST_FUEL_PRICES.diesel * (1 + changePct / 100);
    const deliveryDelta = newDeliveryCost - baselineDeliveryCost;

    // Household: assume fuel/transport is ~15% of household expenses
    const householdFuelComponent = householdExpenses * 0.15;
    const householdDelta = (householdFuelComponent * (petrolPrice / LATEST_FUEL_PRICES.petrol)) - householdFuelComponent;

    return {
      baselineFuelCost,
      newFuelCost,
      personalFuelDelta,
      transportDelta,
      deliveryDelta,
      householdDelta,
      baselineDeliveryCost,
      newDeliveryCost,
    };
  }, [petrolPrice, monthlyFuelLitres, monthlyTransport, deliveryDistance, deliveryEfficiency, householdExpenses, changePct]);

  const ScenarioCard = ({
    icon: Icon,
    title,
    baseline,
    newValue,
    delta,
    color,
  }: {
    icon: typeof Fuel;
    title: string;
    baseline: number;
    newValue: number;
    delta: number;
    color: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-border/60">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Icon className={`h-4.5 w-4.5 ${color}`} />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-secondary/50 p-3">
              <div className="text-xs text-muted-foreground">Current</div>
              <div className="mt-1 text-lg font-bold">{PKR(baseline)}</div>
            </div>
            <div className="rounded-lg bg-secondary/50 p-3">
              <div className="text-xs text-muted-foreground">Scenario</div>
              <div className="mt-1 text-lg font-bold">{PKR(newValue)}</div>
            </div>
          </div>
          <div className={`mt-3 flex items-center gap-1.5 text-sm font-semibold ${delta > 0 ? 'text-destructive' : delta < 0 ? 'text-success' : 'text-muted-foreground'}`}>
            {delta > 0 ? <TrendingUp className="h-4 w-4" /> : delta < 0 ? <TrendingDown className="h-4 w-4" /> : null}
            {delta > 0 ? '+' : ''}{PKR(delta)}
            <span className="text-xs font-normal text-muted-foreground">/ month</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
            <Sliders className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">"What If?" Scenario Simulator</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              See how fuel price changes could affect your expenses
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <DataStatusBadge status={DATA_STATUS} />
          <span className="text-xs text-muted-foreground">
            Baseline price: {PKR(LATEST_FUEL_PRICES.petrol)}/L as of {DATA_AS_OF}
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Controls */}
        <div className="lg:col-span-1">
          <Card className="border-border/60 sticky top-20">
            <CardHeader>
              <CardTitle className="text-lg">Adjust Petrol Price</CardTitle>
              <CardDescription>Choose a preset or set a custom value</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((pct) => (
                  <Button
                    key={pct}
                    size="sm"
                    variant={!customMode && Math.round(changePct) === pct ? 'default' : 'outline'}
                    onClick={() => {
                      setCustomMode(false);
                      setPetrolPrice(LATEST_FUEL_PRICES.petrol * (1 + pct / 100));
                    }}
                  >
                    {pct > 0 ? '+' : ''}{pct}%
                  </Button>
                ))}
                <Button
                  size="sm"
                  variant={customMode ? 'default' : 'outline'}
                  onClick={() => setCustomMode(true)}
                >
                  Custom
                </Button>
              </div>

              {customMode && (
                <div>
                  <Label className="mb-2 block text-sm">Custom Petrol Price (PKR/L)</Label>
                  <Input
                    type="number"
                    value={petrolPrice}
                    onChange={(e) => setPetrolPrice(Number(e.target.value) || 0)}
                  />
                </div>
              )}

              <div>
                <Label className="mb-2 block text-sm">Fine-tune: {PKR(petrolPrice)}/L</Label>
                <Slider
                  value={[petrolPrice]}
                  onValueChange={(v) => setPetrolPrice(v[0])}
                  min={Math.round(LATEST_FUEL_PRICES.petrol * 0.5)}
                  max={Math.round(LATEST_FUEL_PRICES.petrol * 1.5)}
                  step={0.5}
                />
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>{PKR(LATEST_FUEL_PRICES.petrol * 0.5)}</span>
                  <span className={`font-semibold ${changePct > 0 ? 'text-destructive' : changePct < 0 ? 'text-success' : ''}`}>
                    {changePct > 0 ? '+' : ''}{changePct.toFixed(1)}%
                  </span>
                  <span>{PKR(LATEST_FUEL_PRICES.petrol * 1.5)}</span>
                </div>
              </div>

              <div className="space-y-3 border-t border-border pt-4">
                <h4 className="text-sm font-semibold">Your Baseline</h4>
                <div>
                  <Label className="mb-1.5 block text-xs">Monthly Fuel Consumption (L)</Label>
                  <Input type="number" value={monthlyFuelLitres} onChange={(e) => setMonthlyFuelLitres(Number(e.target.value) || 0)} />
                </div>
                <div>
                  <Label className="mb-1.5 block text-xs">Monthly Transport Budget (PKR)</Label>
                  <Input type="number" value={monthlyTransport} onChange={(e) => setMonthlyTransport(Number(e.target.value) || 0)} />
                </div>
                <div>
                  <Label className="mb-1.5 block text-xs">Delivery Distance (km/month)</Label>
                  <Input type="number" value={deliveryDistance} onChange={(e) => setDeliveryDistance(Number(e.target.value) || 0)} />
                </div>
                <div>
                  <Label className="mb-1.5 block text-xs">Delivery Vehicle Efficiency (km/L)</Label>
                  <Input type="number" value={deliveryEfficiency} onChange={(e) => setDeliveryEfficiency(Number(e.target.value) || 0)} />
                </div>
                <div>
                  <Label className="mb-1.5 block text-xs">Monthly Household Expenses (PKR)</Label>
                  <Input type="number" value={householdExpenses} onChange={(e) => setHouseholdExpenses(Number(e.target.value) || 0)} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <ScenarioCard
              icon={Fuel}
              title="Personal Fuel Expense"
              baseline={results.baselineFuelCost}
              newValue={results.newFuelCost}
              delta={results.personalFuelDelta}
              color="text-accent"
            />
            <ScenarioCard
              icon={Truck}
              title="Transportation Budget"
              baseline={monthlyTransport}
              newValue={monthlyTransport + results.transportDelta}
              delta={results.transportDelta}
              color="text-chart-2"
            />
            <ScenarioCard
              icon={Truck}
              title="Business Delivery Cost"
              baseline={results.baselineDeliveryCost}
              newValue={results.newDeliveryCost}
              delta={results.deliveryDelta}
              color="text-chart-4"
            />
            <ScenarioCard
              icon={HomeIcon}
              title="Household Monthly Expenses"
              baseline={householdExpenses}
              newValue={householdExpenses + results.householdDelta}
              delta={results.householdDelta}
              color="text-chart-3"
            />
          </div>

          {/* Assumptions */}
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="h-5 w-5 text-accent" />
                Assumptions &amp; Methodology
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <Badge variant="secondary" className="shrink-0 text-[10px]">Transport</Badge>
                <p>Fuel is assumed to be approximately 40% of total transport spending. This is a simplification — actual ratios vary.</p>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="secondary" className="shrink-0 text-[10px]">Delivery</Badge>
                <p>Diesel price change is assumed to match petrol percentage change. In reality, petrol and diesel move independently.</p>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="secondary" className="shrink-0 text-[10px]">Household</Badge>
                <p>Fuel and transport combined are assumed to be approximately 15% of household expenses.</p>
              </div>
              <div className="rounded-lg bg-warning/10 px-3 py-2 text-xs text-warning">
                <strong>Important:</strong> These are educational estimates, not predictions of actual
                future inflation. Many other factors influence costs beyond fuel prices. This tool
                does not account for government subsidies, price caps, or policy interventions.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
