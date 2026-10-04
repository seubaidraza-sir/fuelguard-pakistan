export const SITE_NAV = [
  { href: '/fuel-prices', label: 'Fuel Prices' },
  { href: '/inflation', label: 'Inflation' },
  { href: '/calculator', label: 'Calculators' },
  { href: '/scenarios', label: 'Scenarios' },
  { href: '/transport', label: 'Transport' },
  { href: '/education', label: 'Education' },
  { href: '/sources', label: 'Sources' },
];

export const MOBILE_NAV = [
  { href: '/', label: 'Home', icon: 'Home' },
  { href: '/fuel-prices', label: 'Prices', icon: 'Fuel' },
  { href: '/inflation', label: 'Inflation', icon: 'TrendingUp' },
  { href: '/calculator', label: 'Calculator', icon: 'Calculator' },
  { href: '/dashboard', label: 'Profile', icon: 'User' },
];

export const DATA_SOURCES = [
  {
    name: 'Oil & Gas Regulatory Authority (OGRA)',
    short: 'OGRA',
    url: 'https://www.ogra.org.pk',
    description: 'Official fuel price notifications published fortnightly',
  },
  {
    name: 'Pakistan Bureau of Statistics (PBS)',
    short: 'PBS',
    url: 'https://www.pbs.gov.pk',
    description: 'Official CPI, inflation, and economic indicators',
  },
  {
    name: 'State Bank of Pakistan (SBP)',
    short: 'SBP',
    url: 'https://www.sbp.org.pk',
    description: 'Monetary policy, exchange rates, and economic data',
  },
];

export const FUEL_TYPES = [
  { id: 'petrol', name: 'Petrol (MS)', unit: 'PKR/L', color: 'hsl(var(--chart-1))' },
  { id: 'diesel', name: 'High-Speed Diesel (HSD)', unit: 'PKR/L', color: 'hsl(var(--chart-2))' },
  { id: 'kerosene', name: 'Kerosene Oil (SKO)', unit: 'PKR/L', color: 'hsl(var(--chart-4))' },
  { id: 'light-diesel', name: 'Light Diesel Oil (LDO)', unit: 'PKR/L', color: 'hsl(var(--chart-3))' },
  { id: 'cng', name: 'Compressed Natural Gas (CNG)', unit: 'PKR/Kg', color: 'hsl(var(--chart-5))' },
];

export const VEHICLE_TYPES = [
  { id: 'car-petrol', label: 'Car (Petrol)', defaultEfficiency: 12, fuelType: 'petrol' },
  { id: 'car-diesel', label: 'Car (Diesel)', defaultEfficiency: 14, fuelType: 'diesel' },
  { id: 'motorcycle', label: 'Motorcycle', defaultEfficiency: 45, fuelType: 'petrol' },
  { id: 'rickshaw', label: 'Auto Rickshaw (CNG)', defaultEfficiency: 30, fuelType: 'cng' },
  { id: 'van', label: 'Van / Minibus', defaultEfficiency: 8, fuelType: 'diesel' },
  { id: 'delivery', label: 'Delivery Vehicle', defaultEfficiency: 10, fuelType: 'diesel' },
  { id: 'truck', label: 'Truck', defaultEfficiency: 5, fuelType: 'diesel' },
  { id: 'bus', label: 'Bus', defaultEfficiency: 4, fuelType: 'diesel' },
];

export const BUDGET_CATEGORIES = [
  'Fuel',
  'Transport',
  'Food',
  'Rent',
  'Education',
  'Healthcare',
  'Utilities',
  'Shopping',
  'Other',
] as const;

export const PKR = (value: number) =>
  new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 2,
  }).format(value);

export const PKR_COMPACT = (value: number) =>
  new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);

export const PCT = (value: number) =>
  `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
