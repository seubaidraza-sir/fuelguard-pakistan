import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { MobileNav } from '@/components/mobile-nav';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fuelguard.pk'),
  title: {
    default: 'FuelGuard Pakistan — Fuel Prices, Inflation & Cost Calculator',
    template: '%s | FuelGuard Pakistan',
  },
  description:
    'Track verified fuel prices in Pakistan, monitor inflation trends, calculate transportation costs, and understand how energy prices affect everyday expenses.',
  keywords: [
    'Pakistan fuel prices',
    'petrol price Pakistan',
    'diesel price Pakistan',
    'inflation Pakistan',
    'fuel cost calculator',
    'CPI Pakistan',
    'transportation cost',
  ],
  authors: [{ name: 'FuelGuard Pakistan' }],
  openGraph: {
    title: 'FuelGuard Pakistan — Understand Fuel Prices. Understand Inflation.',
    description:
      'Track fuel prices, monitor inflation trends, calculate transportation costs, and understand how energy prices affect everyday expenses.',
    type: 'website',
    locale: 'en_PK',
    siteName: 'FuelGuard Pakistan',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FuelGuard Pakistan',
    description:
      'Track fuel prices, monitor inflation, and calculate transportation costs in Pakistan.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0f1e3d' },
    { media: '(prefers-color-scheme: dark)', color: '#0a1424' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1 pb-20 md:pb-0">{children}</main>
            <SiteFooter />
            <MobileNav />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
