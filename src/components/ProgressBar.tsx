export function ProgressBar({ value, label }: { value: number; label?: string }) {
  const pct = Math.max(0, Math.min(100, value));

  return (
    <div>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-accent transition-[width]"
          style={{ width: `${pct}%` }}
        />
      </div>
      {label && (
        <div className="mt-1 flex justify-between font-tabular font-mono text-[11px] text-ink-3">
          <span>{label}</span>
          <span>{pct}%</span>
        </div>
      )}
    </div>
  );
}
