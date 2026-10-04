'use client';

import { useState } from 'react';
import { Bell, Fuel, TrendingUp, Wallet, Info, Plus, BellRing } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { LATEST_FUEL_PRICES } from '@/lib/sample-data/fuel-prices';
import { PKR } from '@/lib/constants';
import { toast } from 'sonner';

interface Alert {
  id: string;
  type: string;
  condition: string;
  threshold: number;
  active: boolean;
  channel: 'in-app' | 'email';
}

const INITIAL_ALERTS: Alert[] = [
  { id: '1', type: 'Petrol Price', condition: 'exceeds', threshold: 265, active: true, channel: 'in-app' },
  { id: '2', type: 'Diesel Price', condition: 'decreases', threshold: 250, active: false, channel: 'email' },
];

const NOTIFICATIONS = [
  { id: '1', title: 'Fuel Price Updated', message: 'Petrol price adjusted to PKR 257.98/L', time: '2 hours ago', type: 'fuel', read: false },
  { id: '2', title: 'Monthly CPI Released', message: 'September CPI: 3.4% (YoY)', time: '1 day ago', type: 'inflation', read: false },
  { id: '3', title: 'Budget Alert', message: 'Your fuel expenses exceeded 20% of budget', time: '3 days ago', type: 'budget', read: true },
  { id: '4', title: 'New Article Published', message: 'Why Do Fuel Prices Change? is now available', time: '5 days ago', type: 'system', read: true },
];

export default function NotificationsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [newType, setNewType] = useState('Petrol Price');
  const [newCondition, setNewCondition] = useState('exceeds');
  const [newThreshold, setNewThreshold] = useState('');
  const [emailEnabled, setEmailEnabled] = useState(true);

  function addAlert() {
    if (!newThreshold) return;
    setAlerts([...alerts, {
      id: Date.now().toString(),
      type: newType,
      condition: newCondition,
      threshold: Number(newThreshold),
      active: true,
      channel: emailEnabled ? 'email' : 'in-app',
    }]);
    setNewThreshold('');
    toast.success('Price alert created');
  }

  function toggleAlert(id: string) {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, active: !a.active } : a)));
  }

  function removeAlert(id: string) {
    setAlerts(alerts.filter((a) => a.id !== id));
  }

  const notifIcon = (type: string) => {
    switch (type) {
      case 'fuel': return Fuel;
      case 'inflation': return TrendingUp;
      case 'budget': return Wallet;
      default: return Info;
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
            <Bell className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notifications &amp; Alerts</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage your alerts and view notifications</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Price Alerts */}
        <div className="space-y-6">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BellRing className="h-5 w-5 text-accent" />
                Create Price Alert
              </CardTitle>
              <CardDescription>Get notified when fuel prices hit your threshold</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="mb-1.5 block text-sm">Alert Type</Label>
                <Select value={newType} onValueChange={setNewType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Petrol Price">Petrol Price</SelectItem>
                    <SelectItem value="Diesel Price">Diesel Price</SelectItem>
                    <SelectItem value="Inflation Threshold">Inflation Threshold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1.5 block text-sm">Condition</Label>
                <Select value={newCondition} onValueChange={setNewCondition}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exceeds">Exceeds</SelectItem>
                    <SelectItem value="decreases">Drops below</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1.5 block text-sm">Threshold (PKR/L)</Label>
                <Input type="number" value={newThreshold} onChange={(e) => setNewThreshold(e.target.value)} placeholder={`e.g. ${LATEST_FUEL_PRICES.petrol}`} />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <div className="text-sm font-medium">Email notification</div>
                  <div className="text-xs text-muted-foreground">Receive alerts via email</div>
                </div>
                <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
              </div>
              <Button onClick={addAlert} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Create Alert
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg">Your Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground py-4">No alerts configured</p>
              ) : (
                alerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div className="flex items-center gap-3">
                      <Switch checked={alert.active} onCheckedChange={() => toggleAlert(alert.id)} />
                      <div>
                        <div className="text-sm font-medium">{alert.type} {alert.condition} {PKR(alert.threshold)}</div>
                        <div className="text-xs text-muted-foreground">
                          {alert.channel === 'email' ? 'Email' : 'In-app'} notification
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeAlert(alert.id)} className="text-destructive">Remove</Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5 text-accent" />
              Notification Center
            </CardTitle>
            <CardDescription>Recent platform notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {NOTIFICATIONS.map((notif) => {
              const Icon = notifIcon(notif.type);
              return (
                <div key={notif.id} className={`flex items-start gap-3 rounded-lg border p-3 ${notif.read ? 'border-border/40' : 'border-accent/30 bg-accent/5'}`}>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                    <Icon className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{notif.title}</span>
                      {!notif.read && <Badge variant="secondary" className="text-[10px] bg-accent/10 text-accent">New</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground">{notif.message}</p>
                    <span className="text-[10px] text-muted-foreground">{notif.time}</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
