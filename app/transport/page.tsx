'use client';

import { useState, useMemo } from 'react';
import { Truck, Car, Bike, Bus, Navigation, MapPin, Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LATEST_FUEL_PRICES, DATA_AS_OF, DATA_STATUS } from '@/lib/sample-data/fuel-prices';
import { DataStatusBadge } from '@/components/data-status-badge';
import { PKR } from '@/lib/constants';

const VEHICLE_PRESETS = [
  { id: 'car', label: 'Car', icon: Car, efficiency: 12, fuelKey: 'petrol' },
  { id: 'motorcycle', label: 'Motorcycle', icon: Bike, efficiency: 45, fuelKey: 'petrol' },
  { id: 'rickshaw', label: 'Rickshaw (CNG)', icon: Bike, efficiency: 30, fuelKey: 'cng' },
  { id: 'van', label: 'Van', icon: Truck, efficiency: 8, fuelKey: 'diesel' },
  { id: 'delivery', label: 'Delivery Vehicle', icon: Truck, efficiency: 10, fuelKey: 'diesel' },
  { id: 'truck', label: 'Truck', icon: Truck, efficiency: 5, fuelKey: 'diesel' },
  { id: 'bus', label: 'Bus', icon: Bus, efficiency: 4, fuelKey: 'diesel' },
];

const FUEL_MAP: Record<string, number> = {
  petrol: LATEST_FUEL_PRICES.petrol,
  diesel: LATEST_FUEL_PRICES.diesel,
  cng: 180,
};

const CITY_DISTANCES: Record<string, Record<string, number>> = {
  Karachi: { Lahore: 1211, Islamabad: 1410, Peshawar: 1530, Quetta: 856, Multan: 870, Hyderabad: 163 },
  Lahore: { Karachi: 1211, Islamabad: 375, Peshawar: 510, Quetta: 1010, Multan: 340, Faisalabad: 180 },
  Islamabad: { Karachi: 1410, Lahore: 375, Peshawar: 180, Quetta: 1030, Multan: 660, Rawalpindi: 14 },
  Peshawar: { Karachi: 1530, Lahore: 510, Islamabad: 180, Quetta: 1210, Multan: 700, Mardan: 60 },
};

export default function TransportPage() {
  const [vehicleId, setVehicleId] = useState('car');
  const [efficiency, setEfficiency] = useState(12);
  const [fuelKey, setFuelKey] = useState('petrol');
  const [fuelPrice, setFuelPrice] = useState(LATEST_FUEL_PRICES.petrol);
  const [dailyKm, setDailyKm] = useState(40);

  // Trip calculator
  const [origin, setOrigin] = useState('Karachi');
  const [destination, setDestination] = useState('Lahore');
  const [tripDistance, setTripDistance] = useState(1211);
  const [tripEfficiency, setTripEfficiency] = useState(12);
  const [tripFuelPrice, setTripFuelPrice] = useState(LATEST_FUEL_PRICES.petrol);

  const operatingCosts = useMemo(() => {
    const costPerKm = fuelPrice / efficiency;
    const dailyCost = costPerKm * dailyKm;
    const monthlyCost = dailyCost * 26;
    const annualCost = dailyCost * 365;
    return { costPerKm, dailyCost, monthlyCost, annualCost };
  }, [fuelPrice, efficiency, dailyKm]);

  const tripCost = useMemo(() => {
    const litres = tripDistance / tripEfficiency;
    const total = litres * tripFuelPrice;
    return { litres, total };
  }, [tripDistance, tripEfficiency, tripFuelPrice]);

  function handleVehicleChange(id: string) {
    const v = VEHICLE_PRESETS.find((p) => p.id === id);
    if (!v) return;
    setVehicleId(id);
    setEfficiency(v.efficiency);
    setFuelKey(v.fuelKey);
    setFuelPrice(FUEL_MAP[v.fuelKey] ?? fuelPrice);
  }

  function handleTripOriginChange(city: string) {
    setOrigin(city);
    const dist = CITY_DISTANCES[city]?.[destination];
    if (dist) setTripDistance(dist);
  }

  function handleTripDestChange(city: string) {
    setDestination(city);
    const dist = CITY_DISTANCES[origin]?.[city];
    if (dist) setTripDistance(dist);
  }

  const cities = Object.keys(CITY_DISTANCES);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
            <Truck className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Transportation Cost Section</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Calculate operating costs and trip expenses for any vehicle type
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <DataStatusBadge status={DATA_STATUS} />
          <span className="text-xs text-muted-foreground">Fuel prices as of {DATA_AS_OF}</span>
        </div>
      </div>

      <Tabs defaultValue="operating" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="operating">Operating Cost</TabsTrigger>
          <TabsTrigger value="trip">Trip Calculator</TabsTrigger>
          <TabsTrigger value="types">Vehicle Types</TabsTrigger>
        </TabsList>

        {/* Operating Cost */}
        <TabsContent value="operating">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-accent" />
                  Vehicle Operating Cost
                </CardTitle>
                <CardDescription>Calculate cost per kilometre and operating expenses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="mb-1.5 block text-sm">Vehicle Type</Label>
                  <Select value={vehicleId} onValueChange={handleVehicleChange}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {VEHICLE_PRESETS.map((v) => (
                        <SelectItem key={v.id} value={v.id}>{v.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="mb-1.5 block text-sm">Fuel Efficiency (km/L)</Label>
                    <Input type="number" value={efficiency} onChange={(e) => setEfficiency(Number(e.target.value) || 0)} />
                  </div>
                  <div>
                    <Label className="mb-1.5 block text-sm">Fuel Price (PKR/L)</Label>
                    <Input type="number" value={fuelPrice} onChange={(e) => setFuelPrice(Number(e.target.value) || 0)} />
                  </div>
                  <div className="col-span-2">
                    <Label className="mb-1.5 block text-sm">Daily Kilometres</Label>
                    <Input type="number" value={dailyKm} onChange={(e) => setDailyKm(Number(e.target.value) || 0)} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-lg">Estimated Operating Costs</CardTitle>
                <CardDescription>Fuel costs only — excludes maintenance, tolls, etc.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-border bg-secondary/50 p-4">
                    <div className="text-xs text-muted-foreground">Cost per Kilometre</div>
                    <div className="mt-1 text-2xl font-bold">{PKR(operatingCosts.costPerKm)}</div>
                  </div>
                  <div className="rounded-lg border border-border bg-secondary/50 p-4">
                    <div className="text-xs text-muted-foreground">Daily Cost</div>
                    <div className="mt-1 text-2xl font-bold">{PKR(operatingCosts.dailyCost)}</div>
                  </div>
                  <div className="rounded-lg border border-border bg-secondary/50 p-4">
                    <div className="text-xs text-muted-foreground">Monthly Cost (26 days)</div>
                    <div className="mt-1 text-2xl font-bold">{PKR(operatingCosts.monthlyCost)}</div>
                  </div>
                  <div className="rounded-lg border border-border bg-secondary/50 p-4">
                    <div className="text-xs text-muted-foreground">Annual Cost</div>
                    <div className="mt-1 text-2xl font-bold">{PKR(operatingCosts.annualCost)}</div>
                  </div>
                </div>
                <div className="mt-4 rounded-lg bg-accent/10 px-3 py-2 text-xs text-muted-foreground">
                  <strong className="text-foreground">Formula:</strong> Cost/km = Fuel Price / Efficiency.
                  Monthly = Daily Cost × 26 days. Actual costs will be higher due to maintenance, tolls, parking, and depreciation.
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Trip Calculator */}
        <TabsContent value="trip">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-accent" />
                  Trip Cost Calculator
                </CardTitle>
                <CardDescription>Estimate fuel cost for a journey between cities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="mb-1.5 block text-sm flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> Starting Location
                    </Label>
                    <Select value={origin} onValueChange={handleTripOriginChange}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-1.5 block text-sm flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> Destination
                    </Label>
                    <Select value={destination} onValueChange={handleTripDestChange}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label className="mb-1.5 block text-sm">Distance (km)</Label>
                  <Input type="number" value={tripDistance} onChange={(e) => setTripDistance(Number(e.target.value) || 0)} />
                  <p className="mt-1 text-xs text-muted-foreground">
                    {origin} → {destination}: {CITY_DISTANCES[origin]?.[destination] ?? 'Custom'} km
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="mb-1.5 block text-sm">Fuel Efficiency (km/L)</Label>
                    <Input type="number" value={tripEfficiency} onChange={(e) => setTripEfficiency(Number(e.target.value) || 0)} />
                  </div>
                  <div>
                    <Label className="mb-1.5 block text-sm">Fuel Price (PKR/L)</Label>
                    <Input type="number" value={tripFuelPrice} onChange={(e) => setTripFuelPrice(Number(e.target.value) || 0)} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-lg">Trip Cost Estimate</CardTitle>
                <CardDescription>{origin} to {destination}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-xl border border-border bg-gradient-to-br from-secondary/50 to-card p-6">
                    <div className="text-sm text-muted-foreground">Total Trip Fuel Cost</div>
                    <div className="mt-2 text-4xl font-bold">{PKR(tripCost.total)}</div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {tripCost.litres.toFixed(2)} litres &middot; {tripDistance} km
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-secondary/50 p-3">
                      <div className="text-xs text-muted-foreground">Fuel Needed</div>
                      <div className="mt-1 text-lg font-bold">{tripCost.litres.toFixed(2)} L</div>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-3">
                      <div className="text-xs text-muted-foreground">Cost per Km</div>
                      <div className="mt-1 text-lg font-bold">{PKR(tripFuelPrice / tripEfficiency)}</div>
                    </div>
                  </div>
                  <div className="rounded-lg bg-accent/10 px-3 py-2 text-xs text-muted-foreground">
                    Estimate only. Actual fuel consumption varies with traffic, road conditions, AC usage, and driving style.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Vehicle Types */}
        <TabsContent value="types">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VEHICLE_PRESETS.map((v) => {
              const price = FUEL_MAP[v.fuelKey] ?? 0;
              const costPerKm = price / v.efficiency;
              const monthly = costPerKm * 40 * 26;
              return (
                <Card key={v.id} className="border-border/60">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <v.icon className="h-5 w-5 text-accent" />
                      {v.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Efficiency</span>
                      <span className="font-medium">{v.efficiency} km/L</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cost per Km</span>
                      <span className="font-medium">{PKR(costPerKm)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly (40 km/day)</span>
                      <span className="font-bold">{PKR(monthly)}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
