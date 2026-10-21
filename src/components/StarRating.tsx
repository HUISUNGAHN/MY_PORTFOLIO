export function StarRating({ rating }: { rating: number }) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="relative inline-block text-sm leading-none tracking-[1px]">
        <span className="text-border">★★★★★</span>
        <span
          className="absolute inset-0 overflow-hidden whitespace-nowrap text-accent"
          style={{ width: `${pct}%` }}
        >
          ★★★★★
        </span>
      </span>
      <span className="font-tabular font-mono text-xs text-ink-2">{rating.toFixed(1)}</span>
    </span>
  );
}
