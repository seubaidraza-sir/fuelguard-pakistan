'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Fuel, TrendingUp, BookOpen, Database, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FUEL_PRICE_HISTORY } from '@/lib/sample-data/fuel-prices';
import { INFLATION_HISTORY } from '@/lib/sample-data/inflation';
import { ARTICLES } from '@/lib/sample-data/articles';
import { DATA_SOURCES } from '@/lib/constants';
import { PKR } from '@/lib/constants';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const results = useMemo(() => {
    if (!query.trim()) return { fuel: [], inflation: [], articles: [], sources: [] };
    const q = query.toLowerCase();

    const fuel = FUEL_PRICE_HISTORY.filter(
      (r) =>
        r.date.includes(q) ||
        r.petrol.toString().includes(q) ||
        r.diesel.toString().includes(q)
    ).slice(0, 5);

    const inflation = INFLATION_HISTORY.filter(
      (r) => r.month.includes(q) || r.cpi.toString().includes(q)
    ).slice(0, 5);

    const articles = ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );

    const sources = DATA_SOURCES.filter(
      (s) => s.name.toLowerCase().includes(q) || s.short.toLowerCase().includes(q)
    );

    return { fuel, inflation, articles, sources };
  }, [query]);

  const hasResults =
    results.fuel.length > 0 ||
    results.inflation.length > 0 ||
    results.articles.length > 0 ||
    results.sources.length > 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Search</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Search fuel prices, inflation data, articles, and sources
        </p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for fuel prices, inflation, articles..."
          className="pl-10 h-12 text-base"
          autoFocus
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {['all', 'fuel', 'inflation', 'articles', 'sources'].map((f) => (
          <Button
            key={f}
            size="sm"
            variant={filter === f ? 'default' : 'outline'}
            onClick={() => setFilter(f)}
            className="capitalize"
          >
            {f}
          </Button>
        ))}
      </div>

      {!query.trim() ? (
        <Card className="border-border/60">
          <CardContent className="py-12 text-center">
            <Search className="mx-auto h-10 w-10 text-muted-foreground/50" />
            <p className="mt-3 text-sm text-muted-foreground">Start typing to search across the platform</p>
          </CardContent>
        </Card>
      ) : !hasResults ? (
        <Card className="border-border/60">
          <CardContent className="py-12 text-center">
            <p className="text-sm text-muted-foreground">No results found for "{query}"</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {(filter === 'all' || filter === 'fuel') && results.fuel.length > 0 && (
            <div>
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Fuel className="h-4 w-4" /> Fuel Prices
              </h2>
              <div className="space-y-2">
                {results.fuel.map((r) => (
                  <Link key={r.date} href="/fuel-prices">
                    <Card className="border-border/60 transition-colors hover:border-accent/40">
                      <CardContent className="flex items-center justify-between py-3">
                        <div>
                          <div className="text-sm font-medium">{new Date(r.date).toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                          <div className="text-xs text-muted-foreground">Petrol: {PKR(r.petrol)} | Diesel: {PKR(r.diesel)}</div>
                        </div>
                        <Fuel className="h-4 w-4 text-muted-foreground" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {(filter === 'all' || filter === 'inflation') && results.inflation.length > 0 && (
            <div>
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <TrendingUp className="h-4 w-4" /> Inflation
              </h2>
              <div className="space-y-2">
                {results.inflation.map((r) => (
                  <Link key={r.month} href="/inflation">
                    <Card className="border-border/60 transition-colors hover:border-accent/40">
                      <CardContent className="flex items-center justify-between py-3">
                        <div>
                          <div className="text-sm font-medium">{r.month}</div>
                          <div className="text-xs text-muted-foreground">CPI: {r.cpi.toFixed(1)}% | Transport: {r.transportInflation.toFixed(1)}%</div>
                        </div>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {(filter === 'all' || filter === 'articles') && results.articles.length > 0 && (
            <div>
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <BookOpen className="h-4 w-4" /> Articles
              </h2>
              <div className="space-y-2">
                {results.articles.map((a) => (
                  <Link key={a.slug} href={`/articles/${a.slug}`}>
                    <Card className="border-border/60 transition-colors hover:border-accent/40">
                      <CardContent className="py-3">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">{a.title}</div>
                          <Badge variant="secondary" className="text-[10px]">{a.category}</Badge>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{a.excerpt}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {(filter === 'all' || filter === 'sources') && results.sources.length > 0 && (
            <div>
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Database className="h-4 w-4" /> Sources
              </h2>
              <div className="space-y-2">
                {results.sources.map((s) => (
                  <Link key={s.short} href="/sources">
                    <Card className="border-border/60 transition-colors hover:border-accent/40">
                      <CardContent className="flex items-center justify-between py-3">
                        <div>
                          <div className="text-sm font-medium">{s.name}</div>
                          <div className="text-xs text-muted-foreground">{s.description}</div>
                        </div>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
