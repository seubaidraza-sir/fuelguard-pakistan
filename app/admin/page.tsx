'use client';

import { useState } from 'react';
import { Shield, Users, Database, FileText, Bell, BarChart3, Settings, Upload, Fuel } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FUEL_PRICE_HISTORY, LATEST_FUEL_PRICES } from '@/lib/sample-data/fuel-prices';
import { PKR } from '@/lib/constants';
import { toast } from 'sonner';

const ROLES = [
  { name: 'Super Admin', users: 2, permissions: 'Full access' },
  { name: 'Data Manager', users: 4, permissions: 'Manage fuel prices & inflation data' },
  { name: 'Content Manager', users: 3, permissions: 'Manage articles & education content' },
  { name: 'User', users: 1248, permissions: 'View public data, manage own budget' },
];

const AUDIT_LOG = [
  { action: 'Fuel price updated', user: 'admin@fuelguard.pk', timestamp: '2026-09-16 09:30', detail: 'Petrol: 259.43 → 257.98' },
  { action: 'Article published', user: 'content@fuelguard.pk', timestamp: '2026-09-15 14:20', detail: 'Why Do Fuel Prices Change?' },
  { action: 'CSV imported', user: 'data@fuelguard.pk', timestamp: '2026-09-14 11:15', detail: 'Inflation dataset (24 rows)' },
  { action: 'User suspended', user: 'admin@fuelguard.pk', timestamp: '2026-09-13 16:45', detail: 'Spam reports — 3 violations' },
];

export default function AdminPage() {
  const [petrolPrice, setPetrolPrice] = useState(LATEST_FUEL_PRICES.petrol);
  const [dieselPrice, setDieselPrice] = useState(LATEST_FUEL_PRICES.diesel);

  function handlePriceUpdate() {
    toast.success('Fuel prices updated successfully. New prices will be visible to all users.');
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage data, users, and platform content</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {[
          { label: 'Total Users', value: '1,257', icon: Users, color: 'text-accent' },
          { label: 'Fuel Price Records', value: FUEL_PRICE_HISTORY.length.toString(), icon: Fuel, color: 'text-chart-2' },
          { label: 'Articles Published', value: '8', icon: FileText, color: 'text-chart-4' },
          { label: 'Active Alerts', value: '342', icon: Bell, color: 'text-chart-3' },
        ].map((stat) => (
          <Card key={stat.label} className="border-border/60">
            <CardContent className="flex items-center justify-between py-4">
              <div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
                <div className="mt-1 text-2xl font-bold">{stat.value}</div>
              </div>
              <stat.icon className={`h-7 w-7 ${stat.color}`} />
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="fuel" className="w-full">
        <TabsList className="mb-6 flex flex-wrap">
          <TabsTrigger value="fuel">Fuel Prices</TabsTrigger>
          <TabsTrigger value="data">Data Import</TabsTrigger>
          <TabsTrigger value="users">Users & Roles</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
        </TabsList>

        {/* Fuel Price Management */}
        <TabsContent value="fuel">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-lg">Update Fuel Prices</CardTitle>
                <CardDescription>Enter verified prices from official OGRA notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="mb-1.5 block text-sm">Petrol (PKR/L)</Label>
                    <Input type="number" step="0.01" value={petrolPrice} onChange={(e) => setPetrolPrice(Number(e.target.value) || 0)} />
                  </div>
                  <div>
                    <Label className="mb-1.5 block text-sm">Diesel (PKR/L)</Label>
                    <Input type="number" step="0.01" value={dieselPrice} onChange={(e) => setDieselPrice(Number(e.target.value) || 0)} />
                  </div>
                </div>
                <div>
                  <Label className="mb-1.5 block text-sm">Effective Date</Label>
                  <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
                <div>
                  <Label className="mb-1.5 block text-sm">Source</Label>
                  <Input defaultValue="OGRA Official Notification" />
                </div>
                <Button onClick={handlePriceUpdate} className="w-full">Publish Price Update</Button>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-lg">Recent Price Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-80 overflow-y-auto">
                  <Table>
                    <TableHeader className="sticky top-0 bg-card">
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Petrol</TableHead>
                        <TableHead className="text-right">Diesel</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[...FUEL_PRICE_HISTORY].slice(-10).reverse().map((r) => (
                        <TableRow key={r.date}>
                          <TableCell className="text-xs">{r.date}</TableCell>
                          <TableCell className="text-right text-xs">{PKR(r.petrol)}</TableCell>
                          <TableCell className="text-right text-xs">{PKR(r.diesel)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Data Import */}
        <TabsContent value="data">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Upload className="h-5 w-5 text-accent" />
                CSV Data Import
              </CardTitle>
              <CardDescription>Upload bulk datasets in CSV format</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border-2 border-dashed border-border p-8 text-center">
                <Upload className="mx-auto h-10 w-10 text-muted-foreground/50" />
                <p className="mt-3 text-sm text-muted-foreground">Drag and drop CSV file here, or click to browse</p>
                <Button variant="outline" className="mt-3">Select File</Button>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3 text-xs text-muted-foreground">
                <strong className="text-foreground">CSV format:</strong> date,petrol,diesel,kerosene,light_diesel,source
                <br />
                All imported data is marked as "Pending Review" until verified by a Super Admin or Data Manager.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users & Roles */}
        <TabsContent value="users">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                Role-Based Access Control
              </CardTitle>
              <CardDescription>4 role tiers with different permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Users</TableHead>
                      <TableHead>Permissions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ROLES.map((role) => (
                      <TableRow key={role.name}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Shield className="h-3.5 w-3.5 text-accent" />
                            {role.name}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{role.users.toLocaleString()}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{role.permissions}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Management */}
        <TabsContent value="content">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-accent" />
                Educational Articles
              </CardTitle>
              <CardDescription>Manage published educational content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {['What Is Inflation?', 'Understanding CPI', 'Why Do Fuel Prices Change?', 'Fuel Efficiency Explained'].map((title) => (
                <div key={title} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <span className="text-sm font-medium">{title}</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-destructive">Unpublish</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Log */}
        <TabsContent value="audit">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-accent" />
                Audit Log
              </CardTitle>
              <CardDescription>All data changes are logged for transparency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {AUDIT_LOG.map((log, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <Database className="h-4 w-4 text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{log.action}</div>
                      <div className="text-xs text-muted-foreground">{log.detail}</div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{log.user}</span>
                        <span>&middot;</span>
                        <span>{log.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
