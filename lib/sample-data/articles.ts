/**
 * SAMPLE / DEMO DATA — Educational articles
 * Status: DEMO
 */

export interface ArticleSummary {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  updatedAt: string;
}

export const ARTICLES: ArticleSummary[] = [
  {
    slug: 'what-is-inflation',
    title: 'What Is Inflation?',
    excerpt: 'A simple explanation of inflation — what it means, how it is measured, and why it matters for your daily life.',
    category: 'Basics',
    readTime: '5 min',
    updatedAt: '2026-09-15',
  },
  {
    slug: 'understanding-cpi',
    title: 'Understanding CPI (Consumer Price Index)',
    excerpt: 'The CPI is the most common inflation measure. Learn how it works, what it tracks, and its limitations.',
    category: 'Basics',
    readTime: '7 min',
    updatedAt: '2026-09-12',
  },
  {
    slug: 'why-fuel-prices-change',
    title: 'Why Do Fuel Prices Change?',
    excerpt: 'Fuel prices in Pakistan are adjusted fortnightly. Understand the documented factors behind these changes.',
    category: 'Fuel',
    readTime: '8 min',
    updatedAt: '2026-09-20',
  },
  {
    slug: 'transportation-cost-breakdown',
    title: 'How Transportation Costs Work',
    excerpt: 'From fuel to maintenance to tolls — understand what goes into the cost of moving people and goods.',
    category: 'Transport',
    readTime: '6 min',
    updatedAt: '2026-09-10',
  },
  {
    slug: 'fuel-efficiency-explained',
    title: 'What Is Fuel Efficiency?',
    excerpt: 'Kilometres per litre, fuel consumption, and how to calculate your real-world fuel economy.',
    category: 'Fuel',
    readTime: '5 min',
    updatedAt: '2026-09-08',
  },
  {
    slug: 'tracking-household-expenses',
    title: 'How Households Can Track Expenses',
    excerpt: 'Practical tips for recording and categorising your monthly spending to understand where your money goes.',
    category: 'Budgeting',
    readTime: '6 min',
    updatedAt: '2026-09-05',
  },
  {
    slug: 'inflation-vs-price-increases',
    title: 'Inflation vs. Individual Price Increases',
    excerpt: 'A single price going up is not the same as inflation. Learn the difference and why it matters.',
    category: 'Basics',
    readTime: '4 min',
    updatedAt: '2026-09-03',
  },
  {
    slug: 'official-vs-estimates',
    title: 'Official Statistics vs. Calculated Estimates',
    excerpt: 'How to tell the difference between official government data and calculated estimates — and why both matter.',
    category: 'Transparency',
    readTime: '5 min',
    updatedAt: '2026-09-01',
  },
];
