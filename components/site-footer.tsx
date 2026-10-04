import Link from 'next/link';
import { Fuel, Shield, Mail, Twitter, Facebook } from 'lucide-react';
import { DATA_SOURCE, DATA_AS_OF } from '@/lib/sample-data/fuel-prices';

export function SiteFooter() {
  return (
    <footer className="hidden md:block border-t border-border/60 bg-card/50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Fuel className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-bold">FuelGuard</span>
                <span className="text-[10px] font-medium text-muted-foreground">Pakistan</span>
              </div>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              A fuel-price transparency and inflation monitoring platform helping citizens understand energy costs and their impact.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Email">
                <Mail className="h-4.5 w-4.5" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
                <Twitter className="h-4.5 w-4.5" />
              </Link>
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Facebook">
                <Facebook className="h-4.5 w-4.5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Platform</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/fuel-prices" className="hover:text-foreground">Fuel Prices</Link></li>
              <li><Link href="/inflation" className="hover:text-foreground">Inflation</Link></li>
              <li><Link href="/calculator" className="hover:text-foreground">Calculator</Link></li>
              <li><Link href="/scenarios" className="hover:text-foreground">Scenarios</Link></li>
              <li><Link href="/transport" className="hover:text-foreground">Transport</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Resources</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/education" className="hover:text-foreground">Education Center</Link></li>
              <li><Link href="/sources" className="hover:text-foreground">Sources &amp; Methodology</Link></li>
              <li><Link href="/transparency" className="hover:text-foreground">How Our Numbers Work</Link></li>
              <li><Link href="/articles" className="hover:text-foreground">Articles</Link></li>
              <li><Link href="/about" className="hover:text-foreground">About</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Account</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/login" className="hover:text-foreground">Sign In</Link></li>
              <li><Link href="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
              <li><Link href="/budget" className="hover:text-foreground">Budget Planner</Link></li>
              <li><Link href="/business" className="hover:text-foreground">Business</Link></li>
              <li><Link href="/admin" className="hover:text-foreground">Admin</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>&copy; {new Date().getFullYear()} FuelGuard Pakistan</span>
            <span className="flex items-center gap-1">
              <Shield className="h-3.5 w-3.5" />
              Data as of {DATA_AS_OF} &middot; {DATA_SOURCE}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="/transparency" className="hover:text-foreground">Transparency</Link>
            <Link href="/contact" className="hover:text-foreground">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
