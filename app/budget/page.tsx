'use client';

import { useState, useMemo } from 'react';
import { Wallet, TrendingUp, TrendingDown, Plus, Trash2, PieChart as PieIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatCard } from '@/components/stat-card';
import { BUDGET_CATEGORIES, PKR } from '@/lib/constants';
import { LATEST_FUEL_PRICES, DATA_AS_OF, DATA_STATUS } from '@/lib/sample-data/fuel-prices';
import { DataStatusBadge } from '@/components/data-status-badge';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface BudgetItem {
  id: string;
  category: string;
  amount: number;
}

const INITIAL_ITEMS: BudgetItem[] = [
  { id: '1', category: 'Fuel', amount: 8000 },
  { id: '2', category: 'Transport', amount: 5000 },
  { id: '3', category: 'Food', amount: 25000 },
  { id: '4', category: 'Rent', amount: 35000 },
  { id: '5', category: 'Utilities', amount: 12000 },
];

const PIE_COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(199 89% 60%)',
  'hsl(160 84% 50%)',
  'hsl(222 56% 50%)',
  'hsl(38 92% 60%)',
];

export default function BudgetPage() {
  const [items, setItems] = useState<BudgetItem[]>(INITIAL_ITEMS);
  const [income, setIncome] = useState(120000);
  const [newCategory, setNewCategory] = useState<string>('Education');
  const [newAmount, setNewAmount] = useState('');

  const totalExpenses = useMemo(() => items.reduce((sum, i) => sum + i.amount, 0), [items]);
  const remaining = income - totalExpenses;
  const fuelTotal = items.filter((i) => i.category === 'Fuel').reduce((s, i) => s + i.amount, 0);
  const fuelPct = totalExpenses > 0 ? (fuelTotal / totalExpenses) * 100 : 0;

  const pieData = items.map((i) => ({ name: i.category, value: i.amount }));

  function addItem() {
    if (!newAmount || Number(newAmount) <= 0) return;
    setItems([...items, { id: Date.now().toString(), category: newCategory, amount: Number(newAmount) }]);
    setNewAmount('');
  }

  function removeItem(id: string) {
    setItems(items.filter((i) => i.id !== id));
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
            <Wallet className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Household Budget Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">Track your monthly income and expenses</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <DataStatusBadge status={DATA_STATUS} />
          <span className="text-xs text-muted-foreground">Data stored locally for this demo</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Monthly Income" value={PKR(income)} icon={<TrendingUp className="h-5 w-5 text-success" />} />
        <StatCard label="Total Expenses" value={PKR(totalExpenses)} icon={<TrendingDown className="h-5 w-5 text-destructive" />} />
        <StatCard label="Remaining Budget" value={PKR(remaining)} icon={<Wallet className="h-5 w-5 text-accent" />} />
        <StatCard label="Fuel % of Expenses" value={`${fuelPct.toFixed(1)}%`} icon={<PieIcon className="h-5 w-5 text-chart-4" />} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Budget Items */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg">Budget Items</CardTitle>
              <CardDescription>Add and manage your expense categories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Select value={newCategory} onValueChange={setNewCategory}>
                  <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {BUDGET_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Input type="number" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} placeholder="Amount (PKR)" />
                <Button onClick={addItem} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-xs font-semibold">
                        {item.category.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{item.category}</div>
                        <div className="text-xs text-muted-foreground">
                          {((item.amount / totalExpenses) * 100).toFixed(1)}% of expenses
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{PKR(item.amount)}</span>
                      <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="h-7 w-7 text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
                {items.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground py-4">No budget items yet. Add one above.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg">Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Label className="text-sm shrink-0">Monthly Income (PKR)</Label>
                <Input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value) || 0)} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Visual Summary */}
        <div className="space-y-6">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <PieIcon className="h-5 w-5 text-accent" />
                Expense Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              {items.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      innerRadius={50}
                      paddingAngle={2}
                    >
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => PKR(value)}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.5rem',
                        fontSize: '12px',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-sm text-muted-foreground py-12">Add budget items to see breakdown</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-secondary/30">
            <CardHeader>
              <CardTitle className="text-sm">Financial Insight</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                Fuel makes up <strong className="text-foreground">{fuelPct.toFixed(1)}%</strong> of your expenses.
              </p>
              <p>
                {remaining > 0
                  ? `You have ${PKR(remaining)} remaining this month.`
                  : `You are over budget by ${PKR(Math.abs(remaining))}.`}
              </p>
              {fuelPct > 20 && (
                <p className="rounded-lg bg-warning/10 px-3 py-2 text-xs text-warning">
                  Fuel expenses are above 20% of your total. Consider using the fuel cost calculator to find savings.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
