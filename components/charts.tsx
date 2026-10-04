'use client';

import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts';

interface ChartDatum {
  [key: string]: string | number;
}

const axisStyle = {
  fontSize: '11px',
  fill: 'hsl(var(--muted-foreground))',
};

const gridStyle = {
  stroke: 'hsl(var(--border))',
  strokeDasharray: '3 3',
};

export function FuelPriceAreaChart({
  data,
  dataKey,
  color,
  name,
  height = 300,
}: {
  data: ChartDatum[];
  dataKey: string;
  color: string;
  name: string;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" style={gridStyle} />
        <XAxis dataKey="date" style={axisStyle} tickMargin={8} />
        <YAxis style={axisStyle} tickMargin={8} width={60} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '0.5rem',
            fontSize: '12px',
          }}
          labelStyle={{ color: 'hsl(var(--foreground))' }}
        />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          fill={`url(#grad-${dataKey})`}
          name={name}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function MultiLineChart({
  data,
  lines,
  height = 300,
  yLabel,
}: {
  data: ChartDatum[];
  lines: { key: string; color: string; name: string }[];
  height?: number;
  yLabel?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" style={gridStyle} />
        <XAxis dataKey="date" style={axisStyle} tickMargin={8} />
        <YAxis style={axisStyle} tickMargin={8} width={50} label={yLabel ? { value: yLabel, angle: -90, position: 'insideLeft', style: axisStyle } : undefined} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '0.5rem',
            fontSize: '12px',
          }}
          labelStyle={{ color: 'hsl(var(--foreground))' }}
        />
        <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
        {lines.map((line) => (
          <Line
            key={line.key}
            type="monotone"
            dataKey={line.key}
            stroke={line.color}
            strokeWidth={2}
            dot={false}
            name={line.name}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export function InflationBarChart({
  data,
  bars,
  height = 320,
}: {
  data: ChartDatum[];
  bars: { key: string; color: string; name: string }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" style={gridStyle} />
        <XAxis dataKey="month" style={axisStyle} tickMargin={8} />
        <YAxis style={axisStyle} tickMargin={8} width={45} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '0.5rem',
            fontSize: '12px',
          }}
          labelStyle={{ color: 'hsl(var(--foreground))' }}
          formatter={(value: number) => `${value.toFixed(1)}%`}
        />
        <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
        <ReferenceLine y={0} stroke="hsl(var(--border))" />
        {bars.map((bar) => (
          <Bar key={bar.key} dataKey={bar.key} fill={bar.color} name={bar.name} radius={[4, 4, 0, 0]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ComposedImpactChart({
  data,
  height = 320,
}: {
  data: ChartDatum[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" style={gridStyle} />
        <XAxis dataKey="label" style={axisStyle} tickMargin={8} />
        <YAxis yAxisId="left" style={axisStyle} tickMargin={8} width={50} />
        <YAxis yAxisId="right" orientation="right" style={axisStyle} tickMargin={8} width={45} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '0.5rem',
            fontSize: '12px',
          }}
          labelStyle={{ color: 'hsl(var(--foreground))' }}
        />
        <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
        <Bar yAxisId="left" dataKey="fuelPrice" fill="hsl(var(--chart-1))" name="Fuel Price (PKR/L)" radius={[4, 4, 0, 0]} />
        <Line yAxisId="right" type="monotone" dataKey="transportInflation" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} name="Transport Inflation (%)" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
