'use client';

import { useState, useMemo } from 'react';
import { Calculator, Fuel, Car, Bike, Truck, Plus, Minus, ArrowLeftRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { LATEST_FUEL_PRICES, DATA_AS_OF, DATA_SOURCE, DATA_STATUS } from '@/lib/sample-data/fuel-prices';
import { DataStatusBadge } from '@/components/data-status-badge';
import { PKR } from '@/lib/constants';

const VEHICLES = [
  { id: 'car-petrol', label: 'Car (Petrol)', efficiency: 12, fuelKey: 'petrol' },
  { id: 'car-diesel', label: 'Car (Diesel)', efficiency: 14, fuelKey: 'diesel' },
  { id: 'motorcycle', label: 'Motorcycle', efficiency: 45, fuelKey: 'petrol' },
  { id: 'rickshaw', label: 'Auto Rickshaw (CNG)', efficiency: 30, fuelKey: 'cng' },
  { id: 'van', label: 'Van / Minibus', efficiency: 8, fuelKey: 'diesel' },
  { id: 'delivery', label: 'Delivery Vehicle', efficiency: 10, fuelKey: 'diesel' },
  { id: 'truck', label: 'Truck', efficiency: 5, fuelKey: 'diesel' },
  { id: 'bus', label: 'Bus', efficiency: 4, fuelKey: 'diesel' },
];

const FUEL_PRICE_MAP: Record<string, number> = {
  petrol: LATEST_FUEL_PRICES.petrol,
  diesel: LATEST_FUEL_PRICES.diesel,
  cng: 180, // approximate CNG price (demo)
};

interface CalcInputs {
  vehicleType: string;
  fuelType: string;
  efficiency: number;
  dailyKm: number;
  travelDays: number;
  fuelPrice: number;
}

function calculateCosts(inputs: CalcInputs) {
  const dailyLitres = inputs.dailyKm / inputs.efficiency;
  const dailyCost = dailyLitres * inputs.fuelPrice;
  const weeklyCost = dailyCost * 7;
  const monthlyCost = dailyCost * inputs.travelDays;
  const annualCost = dailyCost * 365;
  const costPerKm = inputs.fuelPrice / inputs.efficiency;
  return { dailyLitres, dailyCost, weeklyCost, monthlyCost, annualCost, costPerKm };
}

export default function CalculatorPage() {
  const [inputs, setInputs] = useState<CalcInputs>({
    vehicleType: 'car-petrol',
    fuelType: 'petrol',
    efficiency: 12,
    dailyKm: 30,
    travelDays: 26,
    fuelPrice: LATEST_FUEL_PRICES.petrol,
  });

  const [compareMode, setCompareMode] = useState(false);
  const [inputs2, setInputs2] = useState<CalcInputs>({
    vehicleType: 'motorcycle',
    fuelType: 'petrol',
    efficiency: 45,
    dailyKm: 30,
    travelDays: 26,
    fuelPrice: LATEST_FUEL_PRICES.petrol,
  });

  const results = useMemo(() => calculateCosts(inputs), [inputs]);
  const results2 = useMemo(() => calculateCosts(inputs2), [inputs2]);

  function handleVehicleChange(vehicleId: string, setter: (v: CalcInputs) => void, current: CalcInputs) {
    const vehicle = VEHICLES.find((v) => v.id === vehicleId);
    if (!vehicle) return;
    setter({
      ...current,
      vehicleType: vehicleId,
      fuelType: vehicle.fuelKey,
      efficiency: vehicle.efficiency,
      fuelPrice: FUEL_PRICE_MAP[vehicle.fuelKey] ?? current.fuelPrice,
    });
  }

  const ResultGrid = ({ r, title }: { r: typeof results; title: string }) => (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-muted-foreground">{title}</h4>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Daily Cost', value: PKR(r.dailyCost), sub: `${r.dailyLitres.toFixed(2)} L/day` },
          { label: 'Weekly Cost', value: PKR(r.weeklyCost), sub: '7 days' },
          { label: 'Monthly Cost', value: PKR(r.monthlyCost), sub: `${inputs.travelDays} days` },
          { label: 'Annual Cost', value: PKR(r.annualCost), sub: '365 days' },
          { label: 'Cost per Km', value: PKR(r.costPerKm), sub: 'per kilometre' },
        ].map((item) => (
          <div key={item.label} className="rounded-lg border border-border bg-secondary/50 p-3">
            <div className="text-xs text-muted-foreground">{item.label}</div>
            <div className="mt-1 text-lg font-bold">{item.value}</div>
            <div className="text-[10px] text-muted-foreground">{item.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const InputForm = ({ values, setter, title }: { values: CalcInputs; setter: (v: CalcInputs) => void; title: string }) => (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-muted-foreground">{title}</h4>
      <div>
        <Label className="mb-1.5 block text-sm">Vehicle Type</Label>
        <Select value={values.vehicleType} onValueChange={(v) => handleVehicleChange(v, setter, values)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {VEHICLES.map((v) => (
              <SelectItem key={v.id} value={v.id}>{v.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="mb-1.5 block text-sm">Fuel Type</Label>
        <Select value={values.fuelType} onValueChange={(v) => setter({ ...values, fuelType: v, fuelPrice: FUEL_PRICE_MAP[v] ?? values.fuelPrice })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="petrol">Petrol</SelectItem>
            <SelectItem value="diesel">Diesel</SelectItem>
            <SelectItem value="cng">CNG</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="mb-1.5 block text-sm">Fuel Efficiency (km/L)</Label>
          <Input
            type="number"
            value={values.efficiency}
            onChange={(e) => setter({ ...values, efficiency: Number(e.target.value) || 0 })}
          />
        </div>
        <div>
          <Label className="mb-1.5 block text-sm">Daily Distance (km)</Label>
          <Input
            type="number"
            value={values.dailyKm}
            onChange={(e) => setter({ ...values, dailyKm: Number(e.target.value) || 0 })}
          />
        </div>
        <div>
          <Label className="mb-1.5 block text-sm">Travel Days / Month</Label>
          <Input
            type="number"
            value={values.travelDays}
            onChange={(e) => setter({ ...values, travelDays: Number(e.target.value) || 0 })}
          />
        </div>
        <div>
          <Label className="mb-1.5 block text-sm">Fuel Price (PKR/L)</Label>
          <Input
            type="number"
            value={values.fuelPrice}
            onChange={(e) => setter({ ...values, fuelPrice: Number(e.target.value) || 0 })}
          />
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <DataStatusBadge status={DATA_STATUS} />
        <span>Current price: {PKR(FUEL_PRICE_MAP[values.fuelType] ?? 0)} as of {DATA_AS_OF}</span>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
            <Calculator className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Fuel Cost Calculator</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Calculate your fuel expenses for any vehicle and compare options
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ArrowLeftRight className="h-4 w-4" />
          Compare two vehicles
        </div>
        <Switch checked={compareMode} onCheckedChange={setCompareMode} />
      </div>

      <div className={`grid gap-6 ${compareMode ? 'lg:grid-cols-2' : 'lg:grid-cols-2'}`}>
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Car className="h-5 w-5 text-accent" />
              {compareMode ? 'Vehicle A' : 'Calculator'}
            </CardTitle>
            <CardDescription>Enter your vehicle and usage details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <InputForm values={inputs} setter={setInputs} title="Inputs" />
            <ResultGrid r={results} title="Estimated Costs" />
          </CardContent>
        </Card>

        {compareMode ? (
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bike className="h-5 w-5 text-chart-2" />
                Vehicle B
              </CardTitle>
              <CardDescription>Enter the second vehicle to compare</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <InputForm values={inputs2} setter={setInputs2} title="Inputs" />
              <ResultGrid r={results2} title="Estimated Costs" />
            </CardContent>
          </Card>
        ) : (
          <Card className="border-border/60 bg-secondary/30">
            <CardHeader>
              <CardTitle className="text-lg">How It Works</CardTitle>
              <CardDescription>Transparent calculation methodology</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold text-foreground">Daily Fuel Cost</h4>
                <p className="mt-1">(Daily Distance / Fuel Efficiency) × Fuel Price</p>
                <p className="mt-1 text-xs">= ({inputs.dailyKm} km / {inputs.efficiency} km/L) × {PKR(inputs.fuelPrice)}</p>
                <p className="mt-1 text-xs font-semibold text-foreground">= {PKR(results.dailyCost)}/day</p>
              </div>
              <div className="h-px bg-border" />
              <div>
                <h4 className="font-semibold text-foreground">Monthly Cost</h4>
                <p className="mt-1">Daily Cost × Travel Days per Month</p>
                <p className="mt-1 text-xs">= {PKR(results.dailyCost)} × {inputs.travelDays} days</p>
                <p className="mt-1 text-xs font-semibold text-foreground">= {PKR(results.monthlyCost)}/month</p>
              </div>
              <div className="h-px bg-border" />
              <div>
                <h4 className="font-semibold text-foreground">Cost per Kilometre</h4>
                <p className="mt-1">Fuel Price / Fuel Efficiency</p>
                <p className="mt-1 text-xs">= {PKR(inputs.fuelPrice)} / {inputs.efficiency} km/L</p>
                <p className="mt-1 text-xs font-semibold text-foreground">= {PKR(results.costPerKm)}/km</p>
              </div>
              <div className="rounded-lg bg-accent/10 px-3 py-2 text-xs">
                <strong className="text-foreground">Note:</strong> These are estimates based on fuel
                consumption only. Actual costs include maintenance, tolls, parking, depreciation, and insurance.
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {compareMode && (
        <Card className="mt-6 border-border/60">
          <CardHeader>
            <CardTitle className="text-lg">Comparison Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-border p-4">
                <div className="text-xs text-muted-foreground">Monthly Cost Difference</div>
                <div className="mt-1 text-2xl font-bold">
                  {PKR(Math.abs(results.monthlyCost - results2.monthlyCost))}
                </div>
                <div className="text-xs text-muted-foreground">
                  {results.monthlyCost > results2.monthlyCost ? 'Vehicle A costs more' : 'Vehicle B costs more'}
                </div>
              </div>
              <div className="rounded-lg border border-border p-4">
                <div className="text-xs text-muted-foreground">Annual Savings (cheaper option)</div>
                <div className="mt-1 text-2xl font-bold text-success">
                  {PKR(Math.abs(results.annualCost - results2.annualCost))}
                </div>
              </div>
              <div className="rounded-lg border border-border p-4">
                <div className="text-xs text-muted-foreground">Cost per Km Difference</div>
                <div className="mt-1 text-2xl font-bold">
                  {PKR(Math.abs(results.costPerKm - results2.costPerKm))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
