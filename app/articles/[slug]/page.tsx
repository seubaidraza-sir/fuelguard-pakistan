import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, BookOpen, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ARTICLES } from '@/lib/sample-data/articles';

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) return { title: 'Article Not Found' };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const articleContent: Record<string, { intro: string; sections: { heading: string; body: string }[] }> = {
    'what-is-inflation': {
      intro: 'Inflation is the rate at which the general level of prices for goods and services rises over time. When inflation occurs, each unit of currency buys fewer goods and services than before — in other words, the purchasing power of money decreases.',
      sections: [
        { heading: 'How Is Inflation Measured?', body: 'Inflation is typically measured using a price index, most commonly the Consumer Price Index (CPI). The CPI tracks the price of a fixed basket of goods and services that a typical household buys, including food, housing, transportation, clothing, and healthcare. By comparing the cost of this basket over time, statisticians calculate how much prices have changed.' },
        { heading: 'Why Does Inflation Matter?', body: 'Inflation affects everyone. When prices rise but incomes do not keep pace, people can buy less with the same amount of money. This is particularly important for households with fixed incomes, savers, and anyone planning for future expenses like education or healthcare.' },
        { heading: 'Is All Inflation Bad?', body: 'Not necessarily. Most central banks target a moderate inflation rate (typically 2-5%) because it encourages spending and investment rather than hoarding cash. Very high inflation (hyperinflation) and negative inflation (deflation) both create economic problems.' },
        { heading: 'Inflation vs. Individual Price Increases', body: 'A single product becoming more expensive is not inflation. Inflation refers to a broad, sustained increase in prices across the economy. One fuel price adjustment, for example, is a price change — not necessarily inflation, though it may contribute to inflation if it leads to widespread price increases.' },
      ],
    },
    'understanding-cpi': {
      intro: 'The Consumer Price Index (CPI) is the most widely used measure of inflation. It tracks the average change in prices that consumers pay for a basket of goods and services over time.',
      sections: [
        { heading: 'What Is in the CPI Basket?', body: 'The CPI basket includes hundreds of items grouped into categories: food and beverages, housing, clothing, transportation, medical care, recreation, education, and communication. Each category is weighted based on how much the average household spends on it.' },
        { heading: 'How Is the CPI Calculated?', body: 'Statisticians record the prices of items in the basket at regular intervals. The CPI is calculated by comparing the current cost of the basket to its cost in a base period. The percentage change in the CPI over a year is the annual inflation rate.' },
        { heading: 'Limitations of CPI', body: 'The CPI is an average measure — it may not reflect any single household\'s actual experience. The basket is based on average spending patterns, which may differ significantly from your own. Additionally, the CPI does not capture changes in quality, new products, or substitution effects (when consumers switch to cheaper alternatives).' },
        { heading: 'Core vs. Headline CPI', body: 'Headline CPI includes all items in the basket. Core CPI excludes food and energy prices, which tend to be more volatile. Economists often look at both measures to understand underlying price trends.' },
      ],
    },
    'why-fuel-prices-change': {
      intro: 'Fuel prices in Pakistan are adjusted fortnightly (every two weeks) by the Oil and Gas Regulatory Authority (OGRA). Several documented factors influence these adjustments.',
      sections: [
        { heading: 'International Oil Prices', body: 'Pakistan imports a significant portion of its petroleum products. Changes in global crude oil prices (benchmarked against Brent or Arab Light crude) directly affect domestic fuel costs. When international prices rise, domestic prices typically increase, and vice versa.' },
        { heading: 'Exchange Rate', body: 'Since oil is traded internationally in US dollars, the PKR/USD exchange rate plays a major role. If the rupee depreciates against the dollar, imported oil becomes more expensive in rupee terms, even if the international oil price stays the same.' },
        { heading: 'Taxes and Levies', body: 'Fuel prices include government taxes and levies such as Petroleum Levy and General Sales Tax (GST). Changes in these tax rates affect the final retail price. These are policy decisions made by the government.' },
        { heading: 'Refining and Distribution Costs', body: 'The cost of refining crude oil into petrol, diesel, and other products, plus transportation and distribution expenses, are included in the final price. These costs can vary with energy prices, infrastructure conditions, and logistics.' },
        { heading: 'Important Note', body: 'This article explains documented factors that influence fuel prices. It does not evaluate or endorse any specific government policy, political decision, or party position on fuel pricing.' },
      ],
    },
    'transportation-cost-breakdown': {
      intro: 'Transportation costs include more than just fuel. Understanding the full cost picture helps households and businesses budget more accurately.',
      sections: [
        { heading: 'Fuel Costs', body: 'Fuel is typically the largest variable cost for vehicle operation. It depends on fuel price, vehicle efficiency (km per litre), and distance travelled. Use our fuel cost calculator to estimate this component.' },
        { heading: 'Maintenance and Repairs', body: 'Regular maintenance (oil changes, tyre replacement, servicing) and unexpected repairs add significantly to operating costs. These vary by vehicle age, condition, and usage intensity.' },
        { heading: 'Tolls and Parking', body: 'In Pakistan, motorway tolls and city parking fees add to transportation expenses. These costs vary by route and location and should be factored into trip planning.' },
        { heading: 'Insurance and Registration', body: 'Annual vehicle registration fees and insurance premiums are fixed costs that should be spread across the year when calculating monthly operating costs.' },
        { heading: 'Depreciation', body: 'Vehicles lose value over time. While not a cash expense, depreciation is a real cost of vehicle ownership that affects long-term financial planning.' },
      ],
    },
    'fuel-efficiency-explained': {
      intro: 'Fuel efficiency describes how far a vehicle can travel on a given amount of fuel. In Pakistan, it is typically expressed as kilometres per litre (km/L).',
      sections: [
        { heading: 'How to Measure Your Real Efficiency', body: 'Fill your tank completely and reset your trip meter. Drive normally until the tank is near empty. Fill up again, noting the litres needed. Divide the kilometres travelled by the litres used to get your real km/L.' },
        { heading: 'Factors Affecting Efficiency', body: 'Driving style (aggressive vs. smooth), traffic conditions, air conditioning usage, vehicle maintenance, tyre pressure, road quality, and load weight all affect fuel efficiency. Highway driving is typically more efficient than city driving.' },
        { heading: 'Improving Efficiency', body: 'Maintain proper tyre pressure, service your vehicle regularly, avoid unnecessary idling, drive at moderate speeds, and remove excess weight. These steps can improve efficiency by 10-20%.' },
        { heading: 'Why It Matters', body: 'Higher fuel efficiency means lower fuel costs. Even a small improvement in km/L can save thousands of rupees per year, especially when fuel prices are high.' },
      ],
    },
    'tracking-household-expenses': {
      intro: 'Tracking your household expenses is the first step toward understanding your financial situation and making informed budgeting decisions.',
      sections: [
        { heading: 'Why Track Expenses?', body: 'When you know where your money goes, you can identify areas for potential savings, plan for future expenses, and understand how external factors (like fuel price changes) affect your budget.' },
        { heading: 'How to Start', body: 'Begin by listing all monthly expenses in categories: fuel, transport, food, rent, utilities, education, healthcare, and other. Use our household budget dashboard to record and visualise your spending.' },
        { heading: 'Review Regularly', body: 'Review your expenses monthly. Look for trends, unexpected changes, and categories where spending is higher than expected. This helps you adjust your budget and plan ahead.' },
        { heading: 'Fuel as a Key Category', body: 'Fuel expenses are worth tracking separately because they can change significantly with price adjustments. Knowing your monthly fuel consumption (in litres) helps you estimate the impact of price changes.' },
      ],
    },
    'inflation-vs-price-increases': {
      intro: 'People often confuse individual price increases with inflation. While related, they are different concepts that should be understood separately.',
      sections: [
        { heading: 'A Price Increase', body: 'When a single product or service becomes more expensive, that is a price increase. For example, if petrol goes from PKR 250 to PKR 260 per litre, the price of petrol has increased. This is a specific, measurable change for one product.' },
        { heading: 'Inflation', body: 'Inflation is a broad, sustained increase in the general price level across the economy. It is measured by indexes like the CPI, which tracks hundreds of items. Inflation reflects the overall trend, not individual price changes.' },
        { heading: 'The Relationship', body: 'Individual price increases can contribute to inflation, especially for important items like fuel. When fuel prices rise, transportation costs increase, which can lead to higher prices for goods and services that depend on transport. However, fuel is just one component — many other factors also influence inflation.' },
        { heading: 'Why the Distinction Matters', body: 'Understanding the difference helps you interpret economic news correctly. A single fuel price adjustment does not mean inflation has increased. Inflation is measured by the overall change in the price basket, not by any single item.' },
      ],
    },
    'official-vs-estimates': {
      intro: 'On this platform and in economic reporting generally, it is important to distinguish between official statistics and calculated estimates.',
      sections: [
        { heading: 'Official Statistics', body: 'Official statistics are produced by government statistical agencies using established methodologies. In Pakistan, the Pakistan Bureau of Statistics (PBS) produces the CPI and other inflation measures. OGRA publishes official fuel prices. These figures carry the authority of the producing agency.' },
        { heading: 'Calculated Estimates', body: 'Estimates are derived from formulas, models, or assumptions. Our fuel cost calculator, for example, produces estimates based on efficiency and price inputs. These are useful for planning but are not official measurements.' },
        { heading: 'User-Generated Scenarios', body: 'When you use the scenario simulator to explore "what if" situations, the results are user-generated estimates. They show what would happen under specific assumptions, not what will actually happen.' },
        { heading: 'How to Tell the Difference', body: 'On FuelGuard, every figure is labeled with its data status: "Verified" for official data, "Sample/Demo Data" for illustrative data, and "Estimate" for calculated values. Always check the label before using a figure for decision-making.' },
      ],
    },
  };

  const content = articleContent[article.slug];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/education" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Education Center
      </Link>

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Badge variant="secondary">{article.category}</Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {article.readTime}
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{article.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{article.excerpt}</p>
      </div>

      <Card className="border-border/60">
        <CardContent className="py-8">
          {content ? (
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-foreground">{content.intro}</p>
              {content.sections.map((section, i) => (
                <div key={i}>
                  <h2 className="text-xl font-bold mb-2">{section.heading}</h2>
                  <p className="text-base leading-relaxed text-muted-foreground">{section.body}</p>
                </div>
              ))}
              <div className="mt-8 rounded-lg bg-accent/5 border border-accent/20 p-4">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    This article is for educational purposes and does not represent political opinions
                    or policy recommendations. For detailed methodology, visit our{' '}
                    <Link href="/transparency" className="text-accent hover:underline">transparency page</Link>.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-base text-muted-foreground">Article content coming soon.</p>
          )}
        </CardContent>
      </Card>

      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-3">Related Articles</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 4).map((a) => (
            <Link key={a.slug} href={`/articles/${a.slug}`}>
              <Card className="border-border/60 transition-colors hover:border-accent/40">
                <CardContent className="py-3">
                  <div className="text-sm font-medium">{a.title}</div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <BookOpen className="h-3 w-3" />
                    {a.readTime}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
