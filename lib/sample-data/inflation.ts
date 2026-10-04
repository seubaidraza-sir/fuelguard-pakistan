/**
 * SAMPLE / DEMO DATA — Inflation indicators
 *
 * Based on publicly reported CPI patterns from PBS but should NOT be
 * treated as official verified figures. Status: DEMO.
 * Last updated: 2026-09-27
 */

export interface InflationRecord {
  month: string; // YYYY-MM
  cpi: number;
  foodInflation: number;
  transportInflation: number;
  housingInflation: number;
  coreInflation: number;
  source: string;
  status: 'verified' | 'demo';
}

export const INFLATION_HISTORY: InflationRecord[] = [
  { month: '2024-10', cpi: 7.2, foodInflation: 5.8, transportInflation: 12.4, housingInflation: 8.1, coreInflation: 9.3, source: 'Sample/Demo Data', status: 'demo' },
  { month: '2024-11', cpi: 6.5, foodInflation: 4.2, transportInflation: 10.8, housingInflation: 7.5, coreInflation: 8.7, source: 'Sample/Demo Data', status: 'demo' },
  { month: '2024-12', cpi: 5.8, foodInflation: 3.1, transportInflation: 9.5, housingInflation: 6.8, coreInflation: 8.0, source: 'Sample/Demo Data', status: 'demo' },
  { month: '2025-01', cpi: 5.2, foodInflation: 2.8, transportInflation: 8.2, housingInflation: 6.2, coreInflation: 7.4, source: 'Sample/Demo Data', status: 'demo' },
  { month: '2025-02', cpi: 4.8, foodInflation: 2.2, transportInflation: 7.5, housingInflation: 5.8, coreInflation: 7.0, source: 'Sample/Demo Data', status: 'demo' },
  { month: '2025-03', cpi: 4.5, foodInflation: 2.0, transportInflation: 6.8, housingInflation: 5.5, coreInflation: 6.6, source: 'Sample/Demo Data', status: 'demo' },
  { month: '2025-04', cpi: 4.1, foodInflation: 1.5, transportInflation: 6.2, housingInflation: 5.1, coreInflation: 6.2, source: 'Sample/Demo Data', status: 'demo' },
  { month: '2025-05', cpi: 3.5, foodInflation: 0.8, transportInflation: 5.5, housingInflation: 4.5, coreInflation: 5.7, source: 'Sample/Demo Data', status: 'demo' },
  { month: '2025-06', cpi: 3.2, foodInflation: 0.5, transportInflation: 5.0, housingInflation: 4.2, coreInflation: 5.3, source: 'Sample/Demo Data', status: 'demo' },
  { month: '2025-07', cpi: 3.0, foodInflation: 0.2, transportInflation: 4.5, housingInflation: 3.8, coreInflation: 5.0, source: 'Sample/Demo Data', status: 'demo' },
  { month: '2025-08', cpi: 2.8, foodInflation: -0.3, transportInflation: 4.0, housingInflation: 3.5, coreInflation: 4.7, source: 'Sample/Demo Data', status: 'demo' },
  { month: '2025-09', cpi: 2.5, foodInflation: -0.8, transportInflation: 3.5, housingInflation: 3.2, coreInflation: 4.3, source: 'Sample/Demo Data', status: 'demo' },
  { month: '2025-10', cpi: 2.7, foodInflation: -0.5, transportInflation: 3.8, housingInflation: 3.4, coreInflation: 4.5, source: 'Sample/Demo Data', status: 'demo' },
  { month: '2025-11', cpi: 2.9, foodInflation: 0.1, transportInflation: 4.2, housingInflation: 3.6, coreInflation: 4.8, source: 'Sample/Demo Data', status: 'demo' },
  { month: '2025-12', cpi: 3.1, foodInflation: 0.5, transportInflation: 4.6, housingInflation: 3.8, coreInflation: 5.1, source: 'Sample/Demo Data', status: 'demo' },
  { month: '2026-01', cpi: 3.4, foodInflation: 1.0, transportInflation: 5.0, housingInflation: 4.0, coreInflation: 5.4, source: 'Sample/Demo Data', status: 'demo' },
  { month: '2026-02', cpi: 3.6, foodInflation: 1.3, transportInflation: 5.3, housingInflation: 4.2, coreInflation: 5.7, source: 'Sample/Demo Data', status: 'demo' },
  { month: '2026-03', cpi: 3.5, foodInflation: 1.1, transportInflation: 4.8, housingInflation: 4.1, coreInflation: 5.5, source: 'Sample/Demo Data', status: 'demo' },
  { month: '2026-04', cpi: 3.3, foodInflation: 0.8, transportInflation: 4.5, housingInflation: 3.9, coreInflation: 5.3, source: 'Sample/Demo Data', status: 'demo' },
  { month: '2026-05', cpi: 3.0, foodInflation: 0.4, transportInflation: 4.1, housingInflation: 3.7, coreInflation: 5.0, source: 'Sample/Demo Data', status: 'demo' },
  { month: '2026-06', cpi: 2.9, foodInflation: 0.2, transportInflation: 3.8, housingInflation: 3.5, coreInflation: 4.8, source: 'Sample/Demo Data', status: 'demo' },
  { month: '2026-07', cpi: 3.1, foodInflation: 0.5, transportInflation: 4.0, housingInflation: 3.6, coreInflation: 5.0, source: 'Sample/Demo Data', status: 'demo' },
  { month: '2026-08', cpi: 3.3, foodInflation: 0.9, transportInflation: 4.3, housingInflation: 3.8, coreInflation: 5.2, source: 'Sample/Demo Data', status: 'demo' },
  { month: '2026-09', cpi: 3.4, foodInflation: 1.1, transportInflation: 4.5, housingInflation: 3.9, coreInflation: 5.4, source: 'Sample/Demo Data', status: 'demo' },
];

export const LATEST_INFLATION = INFLATION_HISTORY[INFLATION_HISTORY.length - 1];
export const PREVIOUS_INFLATION = INFLATION_HISTORY[INFLATION_HISTORY.length - 2];
