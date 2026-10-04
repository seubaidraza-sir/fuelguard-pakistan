import { Database, ExternalLink, Info, FileText, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DATA_SOURCES } from '@/lib/constants';
import { DATA_AS_OF, DATA_STATUS } from '@/lib/sample-data/fuel-prices';
import { DataStatusBadge } from '@/components/data-status-badge';

export const metadata = {
  title: 'Sources & Methodology',
  description: 'Where our data comes from, how it is processed, and what each source represents.',
};

export default function SourcesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
            <Database className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sources &amp; Methodology</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Where our data comes from and how it is processed
            </p>
          </div>
        </div>
        <div className="mt-4">
          <DataStatusBadge status={DATA_STATUS} />
          <span className="ml-2 text-xs text-muted-foreground">Data as of {DATA_AS_OF}</span>
        </div>
      </div>

      {/* Data Sources */}
      <Card className="mb-6 border-border/60">
        <CardHeader>
          <CardTitle className="text-xl">Official Data Sources</CardTitle>
          <CardDescription>
            The following are the primary official sources for fuel prices and inflation data in Pakistan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {DATA_SOURCES.map((source) => (
            <div key={source.short} className="rounded-lg border border-border/60 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold">{source.name}</h3>
                    <Badge variant="secondary" className="text-[10px]">{source.short}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{source.description}</p>
                </div>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-accent transition-colors"
                  aria-label={`Visit ${source.name}`}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Import Methods */}
      <Card className="mb-6 border-border/60">
        <CardHeader>
          <CardTitle className="text-xl">Data Import Methods</CardTitle>
          <CardDescription>How data enters the platform</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { method: 'Manual Admin Entry', desc: 'Administrators manually enter verified fuel price records through the admin panel. Each entry includes source, effective date, and status.' },
            { method: 'CSV Import', desc: 'Bulk import of historical datasets via CSV files through the admin dashboard. Imported data is marked with its source and reviewed before publication.' },
            { method: 'API Integration', desc: 'Secure API integrations with official sources where available. Data fetched through APIs is automatically timestamped and source-tagged.' },
          ].map((item) => (
            <div key={item.method} className="flex items-start gap-3 rounded-lg border border-border/60 p-4">
              <FileText className="h-5 w-5 shrink-0 text-accent mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold">{item.method}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Methodology */}
      <Card className="mb-6 border-border/60">
        <CardHeader>
          <CardTitle className="text-xl">Calculation Methodology</CardTitle>
          <CardDescription>How our calculators and estimates work</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              title: 'Fuel Cost Calculator',
              formula: 'Daily Cost = (Daily Distance / Efficiency) × Fuel Price',
              note: 'Monthly = Daily Cost × Travel Days. Annual = Daily Cost × 365. Cost per km = Fuel Price / Efficiency.',
            },
            {
              title: 'Inflation Impact Calculator',
              formula: 'Additional Cost = Current Spending × (Price Change %)',
              note: 'Assumes fuel/transport spending changes proportionally with fuel price. This is a simplification.',
            },
            {
              title: 'Scenario Simulator',
              formula: 'New Cost = Baseline Cost × (New Price / Old Price)',
              note: 'Applies percentage change to fuel component only. Other expense components remain unchanged.',
            },
            {
              title: 'Trip Cost Calculator',
              formula: 'Trip Cost = (Distance / Efficiency) × Fuel Price',
              note: 'Straight-line fuel cost only. Does not include tolls, wear, or traffic variation.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-border/60 p-4">
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <code className="mt-2 block rounded-md bg-secondary px-3 py-2 text-xs font-mono">
                {item.formula}
              </code>
              <p className="mt-2 text-xs text-muted-foreground">{item.note}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Limitations */}
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Info className="h-5 w-5 text-warning" />
            Known Limitations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            'Calculators estimate fuel costs only and do not include maintenance, tolls, parking, insurance, or depreciation.',
            'Inflation correlation charts show relationships, not causation. Many factors beyond fuel influence inflation.',
            'Fuel efficiency values are averages and may differ significantly from your actual vehicle performance.',
            'Scenario simulations are educational tools, not predictions of future prices or inflation.',
            'City distances are approximate road distances and may vary with route selection.',
            'All sample/demo data should be replaced with verified data from official sources before production use.',
          ].map((limitation, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
              {limitation}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
