export function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 text-center">
      <div className="font-tabular font-mono text-2xl font-semibold text-ink">{value}</div>
      <div className="mt-1 text-xs text-ink-3">{label}</div>
    </div>
  );
}
