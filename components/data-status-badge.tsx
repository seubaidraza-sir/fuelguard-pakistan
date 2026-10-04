'use client';

import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

interface DataStatusBadgeProps {
  status: 'verified' | 'demo' | 'pending';
  className?: string;
}

export function DataStatusBadge({ status, className }: DataStatusBadgeProps) {
  const config = {
    verified: {
      label: 'Verified',
      icon: CheckCircle2,
      className: 'bg-success/10 text-success border-success/20',
    },
    demo: {
      label: 'Sample/Demo Data',
      icon: AlertTriangle,
      className: 'bg-warning/10 text-warning border-warning/20',
    },
    pending: {
      label: 'Pending Review',
      icon: Clock,
      className: 'bg-muted text-muted-foreground border-border',
    },
  };

  const { label, icon: Icon, className: badgeClass } = config[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        badgeClass,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}

export function DataSourceNote({
  source,
  date,
  status,
  className,
}: {
  source: string;
  date: string;
  status: 'verified' | 'demo' | 'pending';
  className?: string;
}) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2 text-xs text-muted-foreground', className)}>
      <span>
        Source: <span className="font-medium text-foreground/80">{source}</span>
      </span>
      <span className="text-border">|</span>
      <span>Effective: {date}</span>
      <DataStatusBadge status={status} />
    </div>
  );
}
