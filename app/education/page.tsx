import Link from 'next/link';
import { BookOpen, Clock, ArrowRight, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ARTICLES } from '@/lib/sample-data/articles';

export const metadata = {
  title: 'Education Center',
  description: 'Simple, accessible explanations of inflation, CPI, fuel efficiency, and household budgeting.',
};

export default function EducationPage() {
  const categories = Array.from(new Set(ARTICLES.map((a) => a.category)));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Education Center</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Understand inflation, fuel prices, and budgeting in simple language
            </p>
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Badge variant="default">All Topics</Badge>
        {categories.map((cat) => (
          <Badge key={cat} variant="secondary">{cat}</Badge>
        ))}
      </div>

      {/* Articles grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.map((article) => (
          <Link key={article.slug} href={`/articles/${article.slug}`}>
            <Card className="group h-full border-border/60 transition-all hover:border-accent/40 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-[10px]">{article.category}</Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                </div>
                <CardTitle className="mt-2 text-lg group-hover:text-accent transition-colors">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{article.excerpt}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
