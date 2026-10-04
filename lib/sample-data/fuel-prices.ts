/**
 * SAMPLE / DEMO DATA
 *
 * The fuel price history below is SAMPLE DATA for demonstration purposes.
 * It is based on publicly reported patterns of fortnightly fuel price
 * adjustments in Pakistan but should NOT be treated as official verified
 * figures. Real data should be entered through the admin panel or
 * imported from official sources (OGRA, PBS).
 *
 * Source label: "Sample/Demo Data"
 * Last updated: 2026-09-27
 * Status: DEMO
 */

export interface FuelPriceRecord {
  date: string; // ISO date (effective date)
  petrol: number;
  diesel: number;
  kerosene: number;
  lightDiesel: number;
  source: string;
  status: 'verified' | 'demo' | 'pending';
}

// Fortnightly fuel price history (PKR per litre)
// Data spans roughly 2 years for historical charts
export const FUEL_PRICE_HISTORY: FuelPriceRecord[] = [
  { date: '2024-10-01', petrol: 247.03, diesel: 246.29, kerosene: 169.62, lightDiesel: 154.82, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2024-10-16', petrol: 239.36, diesel: 236.53, kerosene: 162.48, lightDiesel: 148.35, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2024-11-01', petrol: 235.27, diesel: 230.57, kerosene: 158.16, lightDiesel: 144.51, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2024-11-16', petrol: 230.08, diesel: 227.72, kerosene: 155.14, lightDiesel: 142.13, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2024-12-01', petrol: 233.96, diesel: 230.53, kerosene: 157.28, lightDiesel: 143.92, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2024-12-16', petrol: 238.43, diesel: 234.99, kerosene: 160.42, lightDiesel: 146.78, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2025-01-01', petrol: 245.30, diesel: 241.05, kerosene: 165.88, lightDiesel: 150.43, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2025-01-16', petrol: 250.41, diesel: 247.22, kerosene: 168.53, lightDiesel: 152.67, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2025-02-01', petrol: 256.13, diesel: 253.85, kerosene: 172.41, lightDiesel: 156.12, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2025-02-16', petrol: 257.13, diesel: 254.68, kerosene: 173.15, lightDiesel: 156.88, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2025-03-01', petrol: 252.98, diesel: 250.47, kerosene: 170.32, lightDiesel: 154.73, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2025-03-16', petrol: 248.83, diesel: 246.41, kerosene: 167.88, lightDiesel: 152.59, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2025-04-01', petrol: 254.63, diesel: 252.12, kerosene: 171.45, lightDiesel: 155.84, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2025-04-16', petrol: 258.43, diesel: 256.78, kerosene: 174.22, lightDiesel: 158.11, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2025-05-01', petrol: 260.12, diesel: 258.34, kerosene: 175.68, lightDiesel: 159.43, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2025-05-16', petrol: 258.11, diesel: 256.22, kerosene: 174.15, lightDiesel: 158.02, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2025-06-01', petrol: 257.12, diesel: 255.08, kerosene: 173.38, lightDiesel: 157.31, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2025-06-16', petrol: 258.98, diesel: 257.21, kerosene: 174.52, lightDiesel: 158.44, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2025-07-01', petrol: 261.45, diesel: 259.72, kerosene: 176.15, lightDiesel: 160.02, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2025-07-16', petrol: 263.88, diesel: 261.55, kerosene: 177.82, lightDiesel: 161.43, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2025-08-01', petrol: 265.32, diesel: 263.14, kerosene: 178.96, lightDiesel: 162.55, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2025-08-16', petrol: 262.74, diesel: 260.88, kerosene: 177.22, lightDiesel: 160.98, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2025-09-01', petrol: 259.13, diesel: 257.42, kerosene: 174.85, lightDiesel: 158.72, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2025-09-16', petrol: 257.10, diesel: 255.33, kerosene: 173.48, lightDiesel: 157.48, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2026-03-01', petrol: 255.98, diesel: 254.12, kerosene: 172.65, lightDiesel: 156.72, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2026-03-16', petrol: 253.41, diesel: 251.68, kerosene: 170.93, lightDiesel: 155.14, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2026-04-01', petrol: 250.18, diesel: 248.45, kerosene: 168.77, lightDiesel: 153.18, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2026-04-16', petrol: 251.95, diesel: 250.22, kerosene: 169.96, lightDiesel: 154.27, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2026-05-01', petrol: 249.27, diesel: 247.55, kerosene: 168.15, lightDiesel: 152.62, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2026-05-16', petrol: 247.83, diesel: 246.12, kerosene: 167.18, lightDiesel: 151.74, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2026-06-01', petrol: 248.45, diesel: 246.78, kerosene: 167.62, lightDiesel: 152.13, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2026-06-16', petrol: 250.12, diesel: 248.43, kerosene: 168.75, lightDiesel: 153.22, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2026-07-01', petrol: 252.43, diesel: 250.68, kerosene: 170.32, lightDiesel: 154.65, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2026-07-16', petrol: 254.87, diesel: 253.12, kerosene: 171.96, lightDiesel: 156.08, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2026-08-01', petrol: 256.32, diesel: 254.55, kerosene: 172.94, lightDiesel: 156.92, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2026-08-16', petrol: 258.10, diesel: 256.33, kerosene: 174.15, lightDiesel: 158.03, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2026-09-01', petrol: 259.43, diesel: 257.68, kerosene: 175.02, lightDiesel: 158.87, source: 'Sample/Demo Data', status: 'demo' },
  { date: '2026-09-16', petrol: 257.98, diesel: 256.22, kerosene: 174.05, lightDiesel: 157.98, source: 'Sample/Demo Data', status: 'demo' },
];

export const LATEST_FUEL_PRICES = FUEL_PRICE_HISTORY[FUEL_PRICE_HISTORY.length - 1];
export const PREVIOUS_FUEL_PRICES = FUEL_PRICE_HISTORY[FUEL_PRICE_HISTORY.length - 2];

export const DATA_AS_OF = LATEST_FUEL_PRICES.date;
export const DATA_SOURCE = LATEST_FUEL_PRICES.source;
export const DATA_STATUS: 'verified' | 'demo' | 'pending' = LATEST_FUEL_PRICES.status;
