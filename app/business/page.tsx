'use client';

import { useState, useMemo } from 'react';
import { Building2, Truck, Plus, Fuel, TrendingDown, Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StatCard } from '@/components/stat-card';
import { LATEST_FUEL_PRICES, DATA_AS_OF, DATA_STATUS } from '@/lib/sample-data/fuel-prices';
import { DataStatusBadge } from '@/components/data-status-badge';
import { PKR } from '@/lib/constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface FleetVehicle {
  id: string;
  name: string;
  type: string;
  efficiency: number; // km/L
  monthlyKm: number;
  fuelType: 'petrol' | 'diesel';
}

const INITIAL_FLEET: FleetVehicle[] = [
  { id: '1', name: 'Delivery Van 01', type: 'Van', efficiency: 8, monthlyKm: 3000, fuelType: 'diesel' },
  { id: '2', name: 'Delivery Van 02', type: 'Van', efficiency: 9, monthlyKm: 2800, fuelType: 'diesel' },
  { id: '3', name: 'Motorcycle Courier', type: 'Motorcycle', efficiency: 45, monthlyKm: 2500, fuelType: 'petrol' },
];

export default function BusinessPage() {
  const [fleet, setFleet] = useState<FleetVehicle[]>(INITIAL_FLEET);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEfficiency, setNewEfficiency] = useState(10);
  const [newKm, setNewKm] = useState(2000);
  const [newFuelType, setNewFuelType] = useState<'petrol' | 'diesel'>('diesel');

  const fleetStats = useMemo(() => {
    return fleet.map((v) => {
      const price = v.fuelType === 'petrol' ? LATEST_FUEL_PRICES.petrol : LATEST_FUEL_PRICES.diesel;
      const litres = v.monthlyKm / v.efficiency;
      const cost = litres * price;
      const costPerKm = price / v.efficiency;
      return { ...v, price, litres, cost, costPerKm };
    });
  }, [fleet]);

  const totalMonthlyCost = fleetStats.reduce((s, v) => s + v.cost, 0);
  const totalKm = fleetStats.reduce((s, v) => s + v.monthlyKm, 0);
  const totalLitres = fleetStats.reduce((s, v) => s + v.litres, 0);
  const avgCostPerKm = totalKm > 0 ? totalMonthlyCost / totalKm : 0;

  // Scenario: if fuel price increases by 10%
  const scenarioIncrease = totalMonthlyCost * 0.1;

  const chartData = fleetStats.map((v) => ({
    name: v.name,
    'Fuel Cost': Math.round(v.cost),
    'Distance (km)': v.monthlyKm,
  }));

  function addVehicle() {
    if (!newName) return;
    setFleet([...fleet, {
      id: Date.now().toString(),
      name: newName,
      type: 'Vehicle',
      efficiency: newEfficiency,
      monthlyKm: newKm,
      fuelType: newFuelType,
    }]);
    setNewName('');
    setShowAdd(false);
  }

  function removeVehicle(id: string) {
    setFleet(fleet.filter((v) => v.id !== id));
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
            <Building2 className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Business Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Fleet management and fuel cost tracking for small businesses
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <DataStatusBadge status={DATA_STATUS} />
          <span className="text-xs text-muted-foreground">Fuel prices as of {DATA_AS_OF}</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Monthly Fuel Cost" value={PKR(totalMonthlyCost)} icon={<Fuel className="h-5 w-5 text-accent" />} />
        <StatCard label="Total Distance" value={`${totalKm.toLocaleString()} km`} icon={<Truck className="h-5 w-5 text-chart-2" />} />
        <StatCard label="Total Fuel Consumption" value={`${totalLitres.toFixed(0)} L`} icon={<Calculator className="h-5 w-5 text-chart-4" />} />
        <StatCard label="Avg Cost per Km" value={PKR(avgCostPerKm)} icon={<TrendingDown className="h-5 w-5 text-chart-3" />} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Fleet Management */}
        <Card className="border-border/60">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Fleet Vehicles</CardTitle>
              <CardDescription>{fleet.length} vehicles in fleet</CardDescription>
            </div>
            <Button size="sm" onClick={() => setShowAdd(!showAdd)}>
              <Plus className="mr-1 h-4 w-4" />
              Add Vehicle
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {showAdd && (
              <div className="rounded-lg border border-dashed border-border p-3 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="mb-1 block text-xs">Vehicle Name</Label>
                    <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Truck 04" />
                  </div>
                  <div>
                    <Label className="mb-1 block text-xs">Fuel Type</Label>
                    <select
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                      value={newFuelType}
                      onChange={(e) => setNewFuelType(e.target.value as 'petrol' | 'diesel')}
                    >
                      <option value="diesel">Diesel</option>
                      <option value="petrol">Petrol</option>
                    </select>
                  </div>
                  <div>
                    <Label className="mb-1 block text-xs">Efficiency (km/L)</Label>
                    <Input type="number" value={newEfficiency} onChange={(e) => setNewEfficiency(Number(e.target.value) || 0)} />
                  </div>
                  <div>
                    <Label className="mb-1 block text-xs">Monthly Km</Label>
                    <Input type="number" value={newKm} onChange={(e) => setNewKm(Number(e.target.value) || 0)} />
                  </div>
                </div>
                <Button size="sm" className="w-full" onClick={addVehicle}>Add to Fleet</Button>
              </div>
            )}
            {fleetStats.map((v) => (
              <div key={v.id} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                      <Truck className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{v.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {v.efficiency} km/L &middot; {v.fuelType} &middot; {v.monthlyKm.toLocaleString()} km/month
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{PKR(v.cost)}</div>
                    <div className="text-xs text-muted-foreground">{PKR(v.costPerKm)}/km</div>
                    <button onClick={() => removeVehicle(v.id)} className="text-xs text-destructive hover:underline">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Charts & Scenario */}
        <div className="space-y-6">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg">Monthly Fuel Cost by Vehicle</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" style={{ fontSize: '10px' }} tickMargin={8} />
                  <YAxis style={{ fontSize: '10px' }} tickMargin={8} width={60} />
                  <Tooltip
                    formatter={(value: number) => PKR(value)}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem', fontSize: '12px' }}
                  />
                  <Bar dataKey="Fuel Cost" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-secondary/30">
            <CardHeader>
              <CardTitle className="text-lg">Fuel Price Impact Scenario</CardTitle>
              <CardDescription>If fuel prices increase by 10%</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border bg-card p-3">
                  <div className="text-xs text-muted-foreground">Current Monthly Cost</div>
                  <div className="mt-1 text-xl font-bold">{PKR(totalMonthlyCost)}</div>
                </div>
                <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3">
                  <div className="text-xs text-muted-foreground">Additional Cost (+10%)</div>
                  <div className="mt-1 text-xl font-bold text-destructive">{PKR(scenarioIncrease)}</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                A 10% fuel price increase would add approximately {PKR(scenarioIncrease)} to your monthly operating costs.
                Use the scenario simulator for custom percentages.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
