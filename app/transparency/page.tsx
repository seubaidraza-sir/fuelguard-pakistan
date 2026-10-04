import { ShieldCheck, Database, Calculator, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'How Our Numbers Work — Transparency',
  description: 'Where our data comes from, when it was updated, how calculations work, and what is official vs. estimated.',
};

export default function TransparencyPage() {
  const sections = [
    {
      icon: Database,
      title: '1. Where the Data Comes From',
      content: [
        'Fuel prices are sourced from the Oil & Gas Regulatory Authority (OGRA), which publishes fortnightly price notifications.',
        'Inflation indicators (CPI, food, transport, housing) come from the Pakistan Bureau of Statistics (PBS).',
        'Exchange rate and monetary data come from the State Bank of Pakistan (SBP).',
        'When official data is not yet available, we display the most recent verified dataset and clearly label its date — we never present stale data as live.',
        'Currently, this platform displays sample/demo data clearly labeled as such. It should be replaced with verified official data before production use.',
      ],
    },
    {
      icon: CheckCircle2,
      title: '2. When It Was Updated',
      content: [
        'Every figure on the platform displays its effective date, source, and data status (verified, demo, or pending).',
        'Fuel prices are updated fortnightly when OGRA publishes new notifications.',
        'Inflation data is updated monthly when PBS releases the CPI bulletin.',
        'The "last updated" timestamp is shown alongside every dataset.',
      ],
    },
    {
      icon: Calculator,
      title: '3. How Calculations Are Performed',
      content: [
        'All calculation formulas are visible and explained on the relevant pages and on the Sources & Methodology page.',
        'Fuel cost calculations use: Cost = (Distance / Efficiency) × Price.',
        'Scenario simulations apply percentage changes to fuel cost components only.',
        'Inflation impact estimates assume a proportional relationship between fuel price changes and transport spending — this is a simplification.',
        'Every calculator clearly labels its results as estimates.',
      ],
    },
    {
      icon: ShieldCheck,
      title: '4. Which Numbers Are Official',
      content: [
        'Official statistics: CPI, food inflation, transport inflation, housing inflation, and fuel prices from OGRA/PBS.',
        'These are marked with a "Verified" badge when sourced from official publications.',
        'Official data represents measurements by government statistical agencies using their own methodologies.',
      ],
    },
    {
      icon: TrendingUp,
      title: '5. Which Numbers Are Estimates',
      content: [
        'Calculated estimates: monthly average fuel prices (computed from fortnightly data), fuel cost projections, scenario simulations.',
        'User-generated scenarios: any "What If?" simulation you create is a user-generated estimate.',
        'All estimates are clearly labeled with "Estimate", "Calculated", or "Sample/Demo Data" badges.',
        'Estimates are educational tools and should not be cited as official measurements.',
      ],
    },
    {
      icon: AlertTriangle,
      title: '6. Limitations of Our Models',
      content: [
        'Our calculators model fuel costs only — they do not account for maintenance, tolls, insurance, depreciation, or financing.',
        'Inflation correlation charts show statistical relationships, not causal proof. Transport inflation is influenced by many factors beyond fuel.',
        'Fuel efficiency values are typical averages. Your actual consumption depends on driving style, traffic, AC usage, vehicle condition, and terrain.',
        'Scenario simulations assume proportional scaling, which is a simplification of real-world economics.',
        'We do not predict future fuel prices or inflation. Our tools show what would happen if a given price change occurred, not whether it will occur.',
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
            <ShieldCheck className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">How Our Numbers Work</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Full transparency about our data, calculations, and limitations
            </p>
          </div>
        </div>
      </div>

      <Card className="mb-6 border-accent/30 bg-accent/5">
        <CardContent className="py-4">
          <p className="text-sm text-foreground">
            <strong>Our promise:</strong> Every number on this platform shows its source, date, and
            methodology. We never fabricate live data, never present estimates as official statistics,
            and never tell you which policies or political positions to support.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {sections.map((section) => (
          <Card key={section.title} className="border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <section.icon className="h-5 w-5 text-accent" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {section.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Data Types Summary */}
      <Card className="mt-6 border-border/60">
        <CardHeader>
          <CardTitle className="text-lg">Data Type Quick Reference</CardTitle>
          <CardDescription>How to identify different types of data on this platform</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { badge: 'Verified', color: 'bg-success/10 text-success border-success/20', desc: 'Official data from OGRA, PBS, or SBP publications' },
            { badge: 'Sample/Demo Data', color: 'bg-warning/10 text-warning border-warning/20', desc: 'Illustrative data for demonstration — not official figures' },
            { badge: 'Pending Review', color: 'bg-muted text-muted-foreground border-border', desc: 'Data awaiting verification by administrators' },
            { badge: 'Estimate', color: 'bg-accent/10 text-accent border-accent/20', desc: 'Calculated from formulas — not an official measurement' },
          ].map((item) => (
            <div key={item.badge} className="flex items-center gap-3">
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${item.color}`}>
                {item.badge}
              </span>
              <span className="text-sm text-muted-foreground">{item.desc}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
