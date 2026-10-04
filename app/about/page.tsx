import { Info, Users, Shield, Target, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'About FuelGuard Pakistan',
  description: 'A fuel-price transparency and inflation monitoring platform for Pakistani citizens.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
            <Info className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">About FuelGuard Pakistan</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Fuel-price transparency and inflation monitoring for citizens
            </p>
          </div>
        </div>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <Card className="border-border/60">
          <CardContent className="py-6">
            <h2 className="text-xl font-bold mb-3">Our Mission</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              FuelGuard Pakistan is a fuel-price transparency and inflation monitoring platform designed
              to help citizens understand current fuel prices, track historical changes, monitor inflation
              trends, and calculate how energy costs affect everyday expenses.
            </p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              We believe that access to clear, verified information about fuel prices and inflation empowers
              people to make better financial decisions. Our platform is built on three principles:
              <strong className="text-foreground"> accuracy, transparency, and accessibility.</strong>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {[
          {
            icon: Target,
            title: 'What We Do',
            points: [
              'Publish verified fuel price data with sources',
              'Track historical fuel price trends',
              'Monitor official inflation indicators',
              'Provide fuel cost calculators',
              'Offer educational content on inflation',
              'Enable personal and business budget tracking',
            ],
          },
          {
            icon: Shield,
            title: 'What We Don\'t Do',
            points: [
              'Express political opinions or endorsements',
              'Predict future fuel prices or inflation',
              'Claim fuel prices alone cause all inflation',
              'Present estimates as official statistics',
              'Fabricate or hard-code "live" statistics',
              'Tell users which policies to support',
            ],
          },
        ].map((section) => (
          <Card key={section.title} className="border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <section.icon className="h-5 w-5 text-accent" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${section.title.includes("Don't") ? 'bg-destructive' : 'bg-success'}`} />
                    {point}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 border-border/60">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-accent" />
            Who We Serve
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">Everyday citizens</strong> who want to understand fuel prices
            and how they affect household budgets.
          </p>
          <p>
            <strong className="text-foreground">Small businesses and delivery operators</strong> who need to
            track fuel costs and plan for price changes.
          </p>
          <p>
            <strong className="text-foreground">Students and researchers</strong> looking for accessible
            inflation data and educational resources.
          </p>
          <p>
            <strong className="text-foreground">Journalists and analysts</strong> who need verified fuel price
            history with clear sourcing.
          </p>
        </CardContent>
      </Card>

      <Card className="mt-6 border-border/60 bg-secondary/30">
        <CardContent className="flex items-center gap-4 py-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
            <Mail className="h-6 w-6 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold">Get in Touch</h3>
            <p className="text-sm text-muted-foreground">Questions, feedback, or data corrections?</p>
          </div>
          <a href="/contact" className="text-sm font-medium text-accent hover:underline">
            Contact us →
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
